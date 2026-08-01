# CropGuard AI - Backend API Specification & Documentation

Production-grade, extensible Express.js TypeScript API backend for the **AI-Powered Crop Disease Detection System**.

---

## Architecture Summary
- **Base URL**: `http://localhost:5000/api` (v1 namespace available at `/api/v1`)
- **Response Standard**: All API endpoints return a standardized JSON structure with `success`, `message`, `data` (or `error`), and `requestId`.
- **Security Headers**: Includes `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and `Strict-Transport-Security`.
- **Request Tracing**: All incoming requests are correlated via `X-Request-ID`.

---

## 1. Service Health Check

### `GET /api/health`
- **Purpose**: Verifies application health status, process uptime, environment, and system memory consumption.
- **Headers**: None required.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Service is healthy",
    "data": {
      "status": "ok",
      "timestamp": "2026-08-01T10:45:00.000Z",
      "uptime": 120,
      "environment": "development",
      "memoryUsage": {
        "heapUsed": 15,
        "heapTotal": 24,
        "rss": 80
      }
    },
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```

---

## 2. Crop Catalog Query

### `GET /api/crops`
- **Purpose**: Returns full list of supported agricultural crops and descriptions.
- **Headers**: None required.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Crops retrieved successfully",
    "data": [
      {
        "id": "crop_tomato",
        "name": "Tomato",
        "scientificName": "Solanum lycopersicum",
        "category": "Solanaceous Vegetable",
        "description": "High-value fruit vegetable..."
      }
    ],
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```

---

## 3. Disease Catalog Query

### `GET /api/diseases`
- **Purpose**: Queries crop disease knowledge catalog.
- **Query Parameters**:
  - `crop` *(optional)*: Filter diseases by crop name (e.g. `GET /api/diseases?crop=Tomato`).
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Diseases retrieved successfully",
    "data": [
      {
        "id": "dis_tomato_early_blight",
        "cropName": "Tomato",
        "diseaseName": "Early Blight",
        "cause": "Fungal pathogen Alternaria solani",
        "severity": "High",
        "symptoms": ["Concentric dark spots..."],
        "immediateAction": "Prune infected lower foliage...",
        "treatment": "Spray copper octanoate...",
        "organicAlternative": "Apply Neem oil (3%)...",
        "prevention": ["Rotate crops..."],
        "recoveryTime": "2 to 3 weeks"
      }
    ],
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```

---

## 4. Secure Image Upload

### `POST /api/predict/upload`
- **Purpose**: Securely receives and validates crop leaf images for AI model inference.
- **Content-Type**: `multipart/form-data` or `image/jpeg` / `image/png`.
- **Limits**: Max 5 MB, single image per request, supported extensions `.jpg`, `.jpeg`, `.png`.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Image uploaded successfully",
    "data": {
      "uploadId": "a2769673-db79-421c-aaa7-e0cfc412d99e",
      "fileName": "a2769673-db79-421c-aaa7-e0cfc412d99e.jpg",
      "fileSize": "1.01 KB",
      "mimeType": "image/jpeg",
      "uploadedAt": "2026-08-01T10:45:00.000Z",
      "status": "READY_FOR_PREDICTION"
    },
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```
- **Possible Errors**:
  - `400 Bad Request`: Missing image payload, file size exceeding 5 MB, unsupported format, or corrupted magic-byte header structure.

---

## 5. AI Crop Disease Prediction

### `POST /api/predict`
- **Purpose**: Integrates uploaded leaf images with the AI Prediction Adapter (`IAiPredictionProvider`).
- **Request Body**:
  ```json
  {
    "uploadId": "a2769673-db79-421c-aaa7-e0cfc412d99e"
  }
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Prediction completed successfully",
    "data": {
      "crop": "Tomato",
      "disease": "Early Blight",
      "confidence": 97.5,
      "risk": "High",
      "recommendation": "Apply copper-based fungicide every 7-10 days...",
      "prevention": ["Practice 3-year crop rotation..."],
      "processingTime": "1.4 sec"
    },
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```
- **Possible Errors**:
  - `400 Bad Request`: Missing `uploadId`, `imageBase64`, or `imageUrl`.
  - `404 Not Found`: Uploaded image file expired or not found.
  - `502 Bad Gateway`: AI microservice returned malformed response.
  - `503 Service Unavailable`: AI service offline or unreachable.
  - `504 Gateway Timeout`: AI model inference request timed out.

---

## 6. Agricultural Recommendation Engine

### `POST /api/recommendation`
- **Purpose**: Generates data-driven agricultural treatments, immediate actions, and organic solutions.
- **Request Body**:
  ```json
  {
    "crop": "Tomato",
    "disease": "Early Blight"
  }
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Recommendation generated successfully",
    "data": {
      "crop": "Tomato",
      "disease": "Early Blight",
      "severity": "High",
      "cause": "Fungal pathogen Alternaria solani",
      "symptoms": ["Concentric target-board dark brown spots..."],
      "immediateAction": "Prune infected lower foliage immediately...",
      "treatment": "Spray copper octanoate...",
      "organicAlternative": "Apply Neem oil (3%)...",
      "prevention": ["Rotate crops..."],
      "recoveryTime": "2 to 3 weeks with diligent treatment"
    },
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```
- **Possible Errors**:
  - `400 Bad Request`: Missing required fields (`crop` or `disease`).
  - `404 Not Found`: Crop or disease not found in knowledge base.

---

## 7. Prediction History

### `GET /api/history`
- **Purpose**: Queries past prediction logs and diagnostic records.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Prediction history retrieved successfully",
    "data": [
      {
        "id": "hist_001",
        "cropName": "Tomato",
        "diseaseName": "Tomato Early Blight",
        "confidence": 0.94,
        "imageUrl": "https://example.com/samples/tomato_sample.jpg",
        "createdAt": "2026-08-01T10:45:00.000Z"
      }
    ],
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
  ```
