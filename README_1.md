Markdown
# 🌾 Crop Dekho — AI Rice Leaf Disease Detection & Remedy System

Crop Dekho is a lightweight computer vision web application designed for smallholder farmers. By uploading a photo of a rice leaf, the system identifies common foliar diseases using a fine-tuned **MobileNetV2** deep learning model and provides immediate, actionable treatment and prevention plans.

## 🚀 Features
* **6-Class Disease Classification:** Detects *Bacterial Leaf Blight*, *Brown Spot*, *Leaf Blast*, *Leaf Scald*, *Sheath Blight*, and *Healthy Rice Leaves*.
* **Edge/CPU Optimized:** Built with MobileNetV2 (`128x128` input resolution, ~8.7 MB footprint) for rapid inference on low-resource devices without requiring a dedicated GPU.
* **Actionable Remedy Engine:** Maps model predictions directly to agricultural causes, immediate field actions, chemical/biological dosage treatments, and seasonal prevention strategies.

## 🧠 Model Architecture
* **Base Network:** Pre-trained `MobileNetV2` (ImageNet weights, frozen convolutional base)
* **Custom Classification Head:** `GlobalAveragePooling2D` -> `Dropout(0.2)` -> `Dense(6, activation='softmax')`
* **Dataset:** Trained and validated on 3,829 augmented rice leaf images across 6 classes.

## 🛠️ Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR-USERNAME/CROP_DEKHO.git](https://github.com/YOUR-USERNAME/CROP_DEKHO.git)
   cd CROP_DEKHO
Install dependencies:

Bash
pip install -r requirements.txt
Run the Streamlit Web App:

Bash
streamlit run app.py

<FollowUp label="Want the exact Git terminal commands to push this folder to GitHub?" q