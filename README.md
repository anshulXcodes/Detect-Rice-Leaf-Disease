# 🌾 Crop Dekho — AI Rice Leaf Disease Detection & Remedy System

Crop Dekho is a lightweight, full-stack computer vision web application designed to help smallholder farmers detect common rice leaf diseases from a photograph and receive immediate, actionable remedy and prevention guidance.

The system uses an **existing, already-trained MobileNetV2 deep learning model** for rice leaf disease classification. The application does **not retrain or modify the model**; it loads the trained model and serves predictions through a FastAPI backend.

```text
Farmer
  ↓
React Frontend
  ↓
FastAPI Backend
  ↓
Existing MobileNetV2 Model
  ↓
Disease Prediction
  ↓
Remedy Engine
  ↓
Result & Treatment Dashboard
```

---

## 🚀 Features

* 🌱 **6-Class Rice Disease Classification**

  * Bacterial Leaf Blight
  * Brown Spot
  * Healthy Rice Leaf
  * Leaf Blast
  * Leaf Scald
  * Sheath Blight

* 🤖 **AI-Powered Detection**

  * Uses a fine-tuned MobileNetV2 image classification model.
  * Accepts rice leaf images and predicts the most likely disease.

* ⚡ **CPU / Edge Optimized**

  * MobileNetV2 architecture
  * `128 × 128` input resolution
  * Approximately `8.7 MB` model footprint
  * Designed for fast inference on low-resource devices.

* 💊 **Actionable Remedy Engine**

  * Disease description
  * Possible causes
  * Symptoms
  * Immediate field actions
  * Treatment guidance
  * Prevention strategies

* 📊 **Confidence-Based Prediction**

  * Displays prediction confidence.
  * Identifies low-confidence predictions.
  * Configurable confidence threshold.

* 🖥️ **Full-Stack Web Application**

  * Modern React frontend
  * FastAPI backend
  * REST API communication
  * Responsive result dashboard

---

# 🧠 Model Architecture

The application uses an existing trained **MobileNetV2** model.

### Base Model

* **Architecture:** MobileNetV2
* **Pre-trained weights:** ImageNet
* **Input size:** `128 × 128 × 3`
* **Convolutional base:** Frozen

### Classification Head

```text
MobileNetV2
     ↓
GlobalAveragePooling2D
     ↓
Dropout(0.2)
     ↓
Dense(6, activation="softmax")
```

### Dataset

The model was trained and validated using **3,829 augmented rice leaf images** across six classes.

---

# ⚠️ Important: Model Class Order

The model's training notebook (`main.ipynb`) uses Keras' `ImageDataGenerator.flow_from_directory`.

Keras assigns class indices **alphabetically according to the directory names**.

The verified class order is:

```text
0 → Bacterial_Leaf_Blight
1 → Brown_Spot
2 → Healthy_Ric_Leaf
3 → Leaf_Blast
4 → Leaf_scald
5 → Sheath_Blight
```

> **Important:** Healthy rice leaf is class index `2`, not the last class.

The backend preserves this exact mapping in:

```text
backend/services/remedy_engine.py
```

The prediction service also checks that the number of configured classes matches the model's output size.

**Do not reorder `CLASS_NAMES` unless the model is retrained with a different class mapping.**

---

# 🛠️ Tech Stack

## Frontend

* React 18
* Vite
* Tailwind CSS
* Axios
* React Router
* Lucide React
* Framer Motion

## Backend

* Python
* FastAPI
* TensorFlow / Keras
* Pillow
* NumPy
* Uvicorn

## Machine Learning

* MobileNetV2
* ImageNet pre-trained weights
* Image classification
* Softmax prediction

---

# 📁 Project Structure

```text
CROP_DEKHO/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar
│   │   │   ├── Hero
│   │   │   ├── UploadBox
│   │   │   ├── ImagePreview
│   │   │   ├── LoadingState
│   │   │   ├── PredictionResult
│   │   │   ├── ConfidenceScore
│   │   │   ├── RemedyCard
│   │   │   ├── DiseaseCard
│   │   │   └── Footer
│   │   │
│   │   ├── pages/
│   │   │   ├── Home
│   │   │   ├── Detect
│   │   │   ├── Diseases
│   │   │   └── About
│   │   │
│   │   └── services/
│   │       └── api.js
│   │
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── model/
│   │   └── rice_model_detect_diseases.keras
│   │
│   ├── services/
│   │   ├── predictor.py
│   │   └── remedy_engine.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/anshulXcodes/Detect-Rice-Leaf-Disease.git
cd Detect-Rice-Leaf-Disease
```

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app:app --reload --port 8000
```

The backend will be available at:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

When the application starts successfully, the model should load once and display:

```text
[predictor] Model loaded successfully. Ready for inference.
```

---

# 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create/update the frontend environment file:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🔄 Application Workflow

```text
1. Farmer uploads rice leaf image
             ↓
2. React sends image to FastAPI
             ↓
3. FastAPI validates the uploaded image
             ↓
4. Predictor preprocesses the image
             ↓
5. MobileNetV2 performs inference
             ↓
6. Highest-probability class is selected
             ↓
7. Remedy Engine retrieves disease information
             ↓
8. Backend returns prediction + remedy
             ↓
9. React displays the result dashboard
```

---

# 🔌 API

## `POST /predict`

Accepts a rice leaf image and returns the predicted disease and corresponding remedy information.

### Request

```text
Content-Type: multipart/form-data
Field: file
```

Supported image formats:

```text
JPG
PNG
```

Maximum file size:

```text
8 MB
```

---

## Example Response

```json
{
  "disease": "Brown Spot",
  "confidence": 0.942,
  "is_healthy": false,
  "low_confidence": false,
  "status": "Diseased",
  "description": "...",
  "cause": "...",
  "symptoms": [
    "..."
  ],
  "immediate_actions": [
    "..."
  ],
  "treatment": [
    "..."
  ],
  "prevention": [
    "..."
  ],
  "disclaimer": "..."
}
```

---

# 📊 Confidence Threshold

The API returns `confidence` as a decimal between `0` and `1`.

For example:

```text
0.942 = 94.2%
```

The application uses a configurable low-confidence threshold.

Default:

```text
LOW_CONFIDENCE_THRESHOLD=0.60
```

Therefore:

```text
confidence < 0.60
        ↓
low_confidence = true
```

The threshold can be configured through:

```text
backend/.env
```

---

# 🌿 Disease Classes

| Class | Disease               |
| ----: | --------------------- |
|     0 | Bacterial Leaf Blight |
|     1 | Brown Spot            |
|     2 | Healthy Rice Leaf     |
|     3 | Leaf Blast            |
|     4 | Leaf Scald            |
|     5 | Sheath Blight         |

---

# 💡 Remedy Engine

The backend contains a dedicated remedy engine:

```text
backend/services/remedy_engine.py
```

It maps each predicted disease to structured agricultural information, including:

* Disease description
* Possible causes
* Common symptoms
* Immediate actions
* Treatment guidance
* Prevention strategies

This keeps agricultural guidance separate from the prediction logic and makes the information easier to review or update.

---

# ⚠️ Treatment Guidance Disclaimer

The chemical treatment information currently included in the remedy engine is based on commonly published agricultural-extension information.

Treatment recommendations can vary depending on:

* Crop stage
* Disease severity
* Geographic location
* Local agricultural regulations
* Product availability
* Approved pesticide labels

**Always confirm chemical treatment and dosage information with a qualified local agricultural extension officer or agriculture department before applying any chemical treatment.**

The application displays a disclaimer alongside treatment information.

---

# 🔐 Model Handling

The project uses an **existing trained model**:

```text
backend/model/rice_model_detect_diseases.keras
```

The application:

* Loads the model at backend startup.
* Keeps the model unchanged.
* Loads the model once rather than loading it for every request.
* Uses the model only for inference.

This improves prediction performance and avoids unnecessary model-loading overhead.

---

# 📌 Key Design Decisions

### Why MobileNetV2?

MobileNetV2 provides a relatively lightweight architecture suitable for applications where computational resources may be limited.

### Why FastAPI?

FastAPI provides a lightweight Python API layer that integrates naturally with TensorFlow/Keras and provides automatic interactive API documentation.

### Why React?

React provides a responsive frontend for image upload, prediction results, confidence visualization, and remedy information.

### Why Separate the Remedy Engine?

Separating prediction from remedy information makes the application easier to maintain and allows agricultural guidance to be reviewed or updated independently of the ML model.

---

# 🚀 Future Improvements

Potential future enhancements include:

* 📱 Progressive Web App / mobile support
* 🌐 Multi-language support for farmers
* 🗣️ Voice-based disease guidance
* 📍 Location-aware agricultural recommendations
* 🌦️ Weather-based disease risk prediction
* 📈 Disease history and prediction tracking
* 🧠 Improved model accuracy with a larger dataset
* 🔍 Explainable AI / Grad-CAM visualization
* ☁️ Cloud deployment
* 📡 Offline or edge inference
* 🧑‍🌾 Farmer-friendly regional language support

---

# 👨‍💻 Project

**Crop Dekho — AI Rice Leaf Disease Detection & Remedy System**

Built using:

```text
React + FastAPI + TensorFlow/Keras + MobileNetV2
```

The goal of Crop Dekho is to make AI-assisted rice disease detection faster, simpler, and more accessible for farmers.
