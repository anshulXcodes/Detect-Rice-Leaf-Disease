"""
app.py — Crop Dekho FastAPI backend.

Exposes a single POST /predict endpoint that:
  1. Accepts a multipart/form-data image upload (field name: "file")
  2. Validates it's a real, supported image
  3. Runs it through the EXISTING trained MobileNetV2 model (loaded once
     at startup by services/predictor.py)
  4. Looks up remedy information for the predicted class
  5. Returns a single structured JSON response

No model training happens here or anywhere in this backend.
"""

import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from services.predictor import predict, InvalidImageError
from services.remedy_engine import get_remedy

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Crop Dekho API",
    description="AI Rice Leaf Disease Detection & Remedy System",
    version="1.0.0",
)

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/x-png",
    "image/pjpeg",
}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024  # 8 MB


def _is_allowed_upload(file: UploadFile) -> bool:
    content_type = (file.content_type or "").lower()
    if content_type in ALLOWED_CONTENT_TYPES:
        return True
    # Some browsers/OS send a blank or generic type; fall back to extension.
    name = (file.filename or "").lower()
    return any(name.endswith(ext) for ext in ALLOWED_EXTENSIONS)


class PredictionResponse(BaseModel):
    disease: str
    confidence: float
    is_healthy: bool
    low_confidence: bool
    status: str
    description: str
    cause: str
    symptoms: List[str]
    immediate_actions: List[str]
    treatment: List[str]
    prevention: List[str]
    disclaimer: str


@app.get("/")
def read_root():
    return {"status": "ok", "service": "Crop Dekho API", "docs": "/docs"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/predict", response_model=PredictionResponse)
async def predict_disease(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file was uploaded.")

    if not _is_allowed_upload(file):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a JPG or PNG image.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail="Image is too large. Please upload an image under 8 MB.",
        )

    try:
        class_name, confidence, low_confidence = predict(file_bytes)
    except InvalidImageError:
        raise HTTPException(
            status_code=400,
            detail="Unable to analyze this image. Please upload a clear photo of a rice leaf.",
        )
    except Exception:
        # Model/prediction failures should never leak internals to the client.
        raise HTTPException(
            status_code=500,
            detail="Something went wrong while analyzing the image. Please try again.",
        )

    try:
        remedy = get_remedy(class_name)
    except KeyError:
        raise HTTPException(
            status_code=500,
            detail="Something went wrong while analyzing the image. Please try again.",
        )
    from services.remedy_engine import DISCLAIMER

    return PredictionResponse(
        disease=remedy["display_name"],
        confidence=round(confidence, 4),
        is_healthy=remedy["status"] == "Healthy",
        low_confidence=low_confidence,
        status=remedy["status"],
        description=remedy["description"],
        cause=remedy["cause"],
        symptoms=remedy["symptoms"],
        immediate_actions=remedy["immediate_actions"],
        treatment=remedy["treatment"],
        prevention=remedy["prevention"],
        disclaimer=DISCLAIMER,
    )
