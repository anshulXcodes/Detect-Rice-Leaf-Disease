"""
predictor.py

Loads the EXISTING trained MobileNetV2 rice-leaf-disease model exactly
once (at import time / server startup) and exposes a single `predict`
function used by the FastAPI route.

This module does not train, fine-tune, or modify the model in any way —
it only performs inference. Preprocessing mirrors main.ipynb exactly:

    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)
    processed_img = preprocess_input(img_batch)   # MobileNetV2 [-1, 1] scaling
    predictions = model.predict(processed_img)

If the model file is ever renamed or moved, only MODEL_PATH below (or the
MODEL_PATH env var) needs to change — no other code should need to change.
"""

import io
import os
from pathlib import Path
from typing import Tuple

import numpy as np
from PIL import Image

# TensorFlow / Keras imports happen at module load (not per request)
# so the model is loaded exactly once when the server starts.
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing import image as keras_image

from services.remedy_engine import CLASS_NAMES

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

IMG_HEIGHT = 128
IMG_WIDTH = 128

# Resolve the model path relative to this file's project root so it works
# regardless of the working directory the server is started from.
_BACKEND_ROOT = Path(__file__).resolve().parent.parent
_DEFAULT_MODEL_PATH = _BACKEND_ROOT / "model" / "rice_model_detect_diseases.keras"
MODEL_PATH = Path(os.getenv("MODEL_PATH", str(_DEFAULT_MODEL_PATH)))

if not MODEL_PATH.is_absolute():
    MODEL_PATH = _BACKEND_ROOT / MODEL_PATH

LOW_CONFIDENCE_THRESHOLD = float(os.getenv("LOW_CONFIDENCE_THRESHOLD", "0.60"))

# ---------------------------------------------------------------------------
# Load the existing model ONCE at import time (i.e. once per server process)
# ---------------------------------------------------------------------------

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Trained model not found at '{MODEL_PATH}'. This service only loads "
        f"an existing model and will not train a new one. Make sure the "
        f".keras file is present, or set MODEL_PATH in backend/.env."
    )

print(f"[predictor] Loading existing model from: {MODEL_PATH}")
# compile=False is inference-only; weights and architecture are unchanged.
model = tf.keras.models.load_model(str(MODEL_PATH), compile=False)
print("[predictor] Model loaded successfully. Ready for inference.")

if len(CLASS_NAMES) != model.output_shape[-1]:
    raise ValueError(
        f"CLASS_NAMES has {len(CLASS_NAMES)} entries but the loaded model "
        f"outputs {model.output_shape[-1]} classes. Check remedy_engine.CLASS_NAMES "
        f"against the model's training configuration."
    )


class InvalidImageError(ValueError):
    """Raised when the uploaded file cannot be read as an image."""


def _load_and_preprocess(file_bytes: bytes) -> np.ndarray:
    """
    Mirrors the exact preprocessing pipeline used in main.ipynb:

        img = image.load_img(img_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_batch = np.expand_dims(img_array, axis=0)
        processed_img = preprocess_input(img_batch)
    """
    try:
        # Validate the bytes are a real image before Keras load_img.
        probe = Image.open(io.BytesIO(file_bytes))
        probe.verify()
        img = keras_image.load_img(
            io.BytesIO(file_bytes),
            target_size=(IMG_HEIGHT, IMG_WIDTH),
            color_mode="rgb",
        )
    except Exception as exc:  # noqa: BLE001 - convert to a client-safe error
        raise InvalidImageError("The uploaded file is not a valid image.") from exc

    img_array = keras_image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)
    processed = preprocess_input(img_batch)
    return processed


def predict(file_bytes: bytes) -> Tuple[str, float, bool]:
    """
    Run inference on raw uploaded image bytes.

    Returns:
        (class_name, confidence, is_low_confidence)
        - class_name: raw key into remedy_engine.REMEDY_DATABASE (e.g. "Brown_Spot")
        - confidence: float in [0, 1]
        - is_low_confidence: True if confidence < LOW_CONFIDENCE_THRESHOLD
    """
    processed = _load_and_preprocess(file_bytes)

    predictions = model.predict(processed, verbose=0)
    probabilities = predictions[0]

    predicted_index = int(np.argmax(probabilities))
    confidence = float(probabilities[predicted_index])
    class_name = CLASS_NAMES[predicted_index]
    is_low_confidence = confidence < LOW_CONFIDENCE_THRESHOLD

    return class_name, confidence, is_low_confidence
