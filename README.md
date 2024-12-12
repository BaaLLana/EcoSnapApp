# Machine Learning Model - EcoSnap

## Deskripsi
Backend ini dirancang untuk mendukung bagian machine learning dari aplikasi **EcoSnap**, sebuah platform yang menggunakan kecerdasan buatan untuk mengklasifikasikan jenis sampah berdasarkan gambar. Fokus utama dari modul ini adalah menyediakan layanan prediksi yang cepat, akurat, dan terintegrasi dengan sistem pengelolaan sampah. Backend ini juga memiliki fleksibilitas untuk pengembangan model machine learning di masa depan.

---

## Fitur-fitur
1. **Prediksi Jenis Sampah**:

- Menggunakan model CNN (Convolutional Neural Network) berbasis Keras (.h5) untuk mengklasifikasikan jenis sampah.
- Mendukung enam jenis sampah utama: `Kaca`, `Logam`, `Kertas`, `Residu`, `Kardus`, `Plastik`.
- Model dilatih menggunakan dataset sampah lokal dan internasional untuk meningkatkan akurasi pada variasi gambar.

2.**Dataset**

- Dataset yang digunakan berasal dari kumpulan gambar sampah yang terbagi dalam beberapa kategori. Dataset ini telah dibagi menjadi tiga set: Train, Validation, dan Test.
  
3. **Evaluasi Model**:

- Menyediakan endpoint untuk mengevaluasi performa model terhadap dataset baru.
- Output berupa metrik seperti akurasi, precision, recall, dan F1-score.

3. **Modularitas Model**:

- Sistem memungkinkan pembaruan atau penggantian model tanpa mengubah struktur backend utama.
- Mendukung format model tambahan seperti TensorFlow SavedModel (.pb) dan ONNX.

4. **Dukungan Pengolahan Data**:

- Gambar diunggah akan melalui preprocessing, seperti resizing ke dimensi 128x128 piksel, normalisasi, dan augmentasi jika diperlukan.
- Menggunakan pipeline preprocessing untuk memastikan konsistensi data input ke model.

---

## Struktur

### 1. **Prediksi Sampah**  
**Endpoint**: `/predict`  
**Method**: `POST`  
**Deskripsi**: Endpoint ini menerima gambar dalam bentuk file atau URL dari bucket untuk melakukan prediksi.

#### **Request (File)**
```json
POST /predict
Content-Type: multipart/form-data

{
  "file": [Gambar dalam format JPEG/PNG]
}
```

#### **Response**
```json
{
  "label": "Plastik",
  "confidence": 92.5,
  "suggestion": "Pisahkan plastik dari sampah lainnya dan tempatkan di tempat sampah khusus plastik.",
  "image_url": "https://storage.googleapis.com/ecosnap/uploads/plastik.jpg"
}
```

### 2. **Evaluasi Model**  
**Endpoint**: `/health`  
**Method**: `POST`  
**Deskripsi**: Endpoint untuk mengevaluasi performa model dengan dataset yang diberikan.
#### **Request**
```
POST /evaluate
Content-Type: application/json

{
  "dataset_url": "https://storage.googleapis.com/ecosnap/datasets/test_dataset.zip"
}
```
#### **Response**
```
{
  "accuracy": 92.3,
  "precision": 91.0,
  "recall": 93.5,
  "f1_score": 92.2
}
```

### 3. **Informasi Model**  
**Endpoint**: `/model-info`  
**Method**: `GET`  
**Deskripsi**: Mengembalikan detail tentang model machine learning yang digunakan.

#### **Response**
```json
{
  "model": "Keras (.h5)",
  "description": "Model untuk klasifikasi jenis sampah berdasarkan gambar.",
  "input_size": "128x128 pixels",
  "output_classes": ["Kaca", "Logam", "Kertas", "Residu", "Kardus", "Plastik"]
}
```

---

## Konfigurasi dan Setup

### **1. Persyaratan Sistem**
- Python 3.9 atau lebih baru
- TensorFlow dan Keras versi terbaru.
- Google Cloud SDK untuk integrasi dengan Google Cloud Services.

### **2. Instalasi Lokal**

#### **Langkah 1: Clone Repository**
```bash
git clone <repository-url>
cd <repository-folder>
```

#### **Langkah 2: Buat Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # Untuk Linux/MacOS
venv\Scripts\activate   # Untuk Windows
```

#### **Langkah 3: Instal Dependensi**
```bash
pip install -r requirements.txt
```

#### **Langkah 4: Jalankan Server**
```bash
python app.py
```

Server akan berjalan di `http://127.0.0.1:8080`.

---

## Teknologi yang Digunakan
- **TensorFlow/Keras**:  Framework untuk membangun dan menjalankan model machine learning.
- **PyTorch dan torchvision** untuk transformasi dataset
- **Google Cloud Storage**: Untuk menyimpan gambar hasil unggahan.
- **VSCode, Google Colab, Kaggle**: Alat untuk pengembangan, pelatihan, dan evaluasi model machine learning.
- **Keras**: Untuk menjalankan model machine learning.
- **KaggleHub** Untuk mengunduh dataset

---

## Catatan Tambahan
- Pastikan model (.h5) disimpan di folder models/ sebelum menjalankan server.
- Gunakan file kredensial key.json untuk mengakses layanan Google Cloud.
- Selalu backup model sebelum memperbarui versi baru.
