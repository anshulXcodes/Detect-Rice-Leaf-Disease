# 🌾 Crop Dekho — AI Rice Leaf Disease Detection & Remedy System

Crop Dekho is a lightweight, full-stack computer vision web application designed to help smallholder farmers detect common rice leaf diseases from a photograph and receive immediate, actionable remedy and prevention guidance.

The system uses an **existing, already-trained MobileNetV2 deep learning model** for rice leaf disease classification. The application does **not retrain or modify the model**; it loads the trained model and serves predictions through a FastAPI backend.

---

# 🚀 Features

## 🌱 6-Class Rice Disease Classification

The system can identify six rice leaf conditions:

* Bacterial Leaf Blight
* Brown Spot
* Healthy Rice Leaf
* Leaf Blast
* Leaf Scald
* Sheath Blight

## 🤖 AI-Powered Detection

* Uses a fine-tuned MobileNetV2 image classification model.
* Accepts rice leaf images and predicts the most likely disease.

## ⚡ CPU / Edge Optimized

* Uses the MobileNetV2 architecture.
* Input resolution: `128 × 128`.
* Approximately `8.7 MB` model footprint.
* Designed for fast inference on low-resource devices.

## 💊 Actionable Remedy Engine

For each detected condition, the system provides:

* Disease description
* Possible causes
* Symptoms
* Immediate field actions
* Treatment guidance
* Prevention strategies

## 📊 Confidence-Based Prediction

* Displays the prediction confidence score.
* Identifies low-confidence predictions.
* Uses a configurable confidence threshold.

## 🖥️ Full-Stack Web Application

* Modern React frontend
* FastAPI backend
* REST API communication
* Responsive prediction and result dashboard

---

# 🧠 Model Architecture

The application uses a trained MobileNetV2-based image classification model.

## Base Model

* **Architecture:** MobileNetV2
* **Pre-trained weights:** ImageNet
* **Input size:** `128 × 128 × 3`
* **Convolutional base:** Frozen

## Classification Head

```text
MobileNetV2
     ↓
GlobalAveragePooling2D
     ↓
Dropout(0.2)
     ↓
Dense(6, activation="softmax")
```

---

# 📊 Dataset

The model was trained and validated using **3,829 augmented rice leaf images** across six classes.

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

### Supported Image Formats

* JPG
* PNG

### Maximum File Size

```text
8 MB
```

---

# 📊 Confidence Threshold

The API returns `confidence` as a decimal between `0` and `1`.

For example:

```text
0.942 = 94.2%
```

The application uses a configurable low-confidence threshold.

### Default

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

# 🚀 Future Improvements

Potential future enhancements include:

* 📱 Progressive Web App / mobile support
* 🌐 Multi-language support for farmers
* 🗣️ Voice-based disease guidance
* 🧠 Improved model accuracy with a larger dataset
* ☁️ Cloud deployment
* 🧑‍🌾 Farmer-friendly regional language support

---

# 👨‍💻 Project

**Crop Dekho — AI Rice Leaf Disease Detection & Remedy System**

Built using:
