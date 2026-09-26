# 🌾 Crop Dekho — AI Rice Leaf Disease Detection & Remedy System

A full-stack web app built around an **existing, already-trained** MobileNetV2
rice leaf disease classifier. This project does not train or modify the
model — it only loads it and serves predictions.

```
Frontend (React) → Backend API (FastAPI) → Existing MobileNetV2 Model
    → Prediction → Remedy Engine → Frontend Result Dashboard
```

## Tech stack

**Frontend:** React 18, Vite, Tailwind CSS, Axios, React Router, lucide-react, Framer Motion
**Backend:** Python, FastAPI, TensorFlow/Keras, Pillow, NumPy, Uvicorn

## Important note on the model — class order

The model's own training notebook (`main.ipynb`, kept for reference) trains
with Keras' `ImageDataGenerator.flow_from_directory`, which assigns class
indices **alphabetically** by folder name. The notebook's own inference cell
confirms the exact order used:

```
0 Bacterial_Leaf_Blight
1 Brown_Spot
2 Healthy_Ric_Leaf   <-- note: healthy is index 2, not last
3 Leaf_Blast
4 Leaf_scald
5 Sheath_Blight
```

`backend/services/remedy_engine.py` hard-codes this exact order in
`CLASS_NAMES`, and `backend/services/predictor.py` checks at startup that
this list's length matches the loaded model's output size. **Do not reorder
this list** unless the model is retrained with a different class mapping.

## Project structure

```
CROP_DEKHO/
├── frontend/            React + Vite + Tailwind app
│   └── src/
│       ├── components/  Navbar, Hero, UploadBox, ImagePreview, LoadingState,
│       │                PredictionResult, ConfidenceScore, RemedyCard,
│       │                DiseaseCard, Footer
│       ├── pages/        Home, Detect, Diseases, About
│       └── services/     api.js (Axios client)
├── backend/
│   ├── app.py            FastAPI app + POST /predict
│   ├── model/            rice_model_detect_diseases.keras (existing, untouched)
│   └── services/
│       ├── predictor.py       loads model ONCE, runs inference
│       └── remedy_engine.py   disease -> remedy data lookup
└── README.md
```

## Running it

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate   # optional but recommended
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

The model loads once at startup — you'll see:
`[predictor] Model loaded successfully. Ready for inference.`

API docs available at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Frontend reads the backend URL from `frontend/.env`
(`VITE_API_BASE_URL=http://localhost:8000`) — update this if you deploy the
backend elsewhere.

## API

### `POST /predict`

`multipart/form-data`, field name `file` (JPG/PNG, up to 8 MB).

```json
{
  "disease": "Brown Spot",
  "confidence": 0.942,
  "is_healthy": false,
  "low_confidence": false,
  "status": "Diseased",
  "description": "...",
  "cause": "...",
  "symptoms": ["..."],
  "immediate_actions": ["..."],
  "treatment": ["..."],
  "prevention": ["..."],
  "disclaimer": "..."
}
```

`confidence` is a decimal between 0 and 1. `low_confidence` is `true` when
confidence is below the threshold set by `LOW_CONFIDENCE_THRESHOLD` in
`backend/.env` (default `0.60`).

## A note on treatment guidance

The chemical treatment entries in `remedy_engine.py` reflect commonly
published agricultural-extension information and are kept in one place so
they can be reviewed and replaced with verified, locally-applicable guidance.
Every prediction response includes a `disclaimer` field the frontend
displays alongside treatment content — always confirm with a local
agricultural extension office before applying any chemical treatment.
