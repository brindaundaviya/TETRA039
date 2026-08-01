# CropGuard AI - Backend API System Specification & Developer Guide

Production-ready, highly extensible Express.js TypeScript API backend for the **AI-Powered Crop Disease Detection System**.

---

## 🌟 System Overview

The CropGuard AI backend is designed with a clean, decoupled architecture. It handles secure leaf image uploads, AI prediction integration (via a pluggable provider pattern), structured agricultural recommendation resolution, and system diagnostics without requiring third-party database or authentication overhead for hackathon demonstrations.

### Key Highlights
- **Strict TypeScript & NodeNext ESM**: 100% type-safe codebase with NodeNext ESM module resolution.
- **Zero Heavy Third-Party Overhead**: Custom, high-performance streaming buffer parser for multipart file uploads, magic-byte signature validation, and HTTP proxy adapters using native Node.js libraries.
- **Decoupled AI Provider Architecture**: Abstracted adapter layer (`IAiPredictionProvider`) allowing seamless switching between mock AI engines and external Python / FastAPI microservices.
- **Standardized API Contract**: Every endpoint returns a predictable JSON response structure with request ID correlation tracking (`X-Request-ID`).
- **Production Hardening**: Production security response headers (`HSTS`, `X-Frame-Options`, `X-Content-Type-Options`), sanitized error output, and input trimming.

---

## 📁 Repository Directory Structure

```text
backend/
├── .env.example                # Environment variable configuration template
├── package.json                # Project manifest and scripts
├── tsconfig.json               # TypeScript configuration (NodeNext)
└── src/
    ├── config/
    │   └── env.ts              # Type-coerced environment configuration
    ├── data/
    │   └── cropKnowledgeBase.ts# Data-driven crop knowledge base catalog
    ├── docs/
    │   └── apiDocumentation.md # Detailed API endpoint specification
    ├── controllers/            # Lightweight HTTP request controllers
    │   ├── cropController.ts
    │   ├── diseaseController.ts
    │   ├── healthController.ts
    │   ├── historyController.ts
    │   ├── predictController.ts
    │   └── recommendationController.ts
    ├── middleware/             # Reusable Express middleware pipeline
    │   ├── errorHandler.ts     # Global error & 404 handler
    │   ├── requestId.ts        # X-Request-ID correlation tracking
    │   ├── requestLogger.ts    # HTTP access logger with duration metrics
    │   ├── securityHeaders.ts # Production security headers
    │   ├── uploadMiddleware.ts # Native multipart/form-data & stream parser
    │   └── validate.ts         # Input validation & sanitization
    ├── routes/                 # Express router registries
    │   ├── cropRoutes.ts
    │   ├── diseaseRoutes.ts
    │   ├── healthRoutes.ts
    │   ├── historyRoutes.ts
    │   ├── predictRoutes.ts
    │   ├── recommendationRoutes.ts
    │   └── index.ts            # Central route mounting (/api & /api/v1)
    ├── server/
    │   └── index.ts            # Server entry point and middleware pipeline
    ├── services/               # Core business logic layer
    │   ├── ai/                 # Decoupled AI Provider Architecture
    │   │   ├── aiProvider.interface.ts  # IAiPredictionProvider contract
    │   │   ├── aiProviderFactory.ts    # Provider instantiation factory
    │   │   ├── httpAiProvider.ts       # External HTTP microservice adapter
    │   │   └── mockAiProvider.ts       # Mock AI inference engine
    │   ├── cropService.ts
    │   ├── diseaseService.ts
    │   ├── historyService.ts
    │   ├── predictService.ts
    │   ├── recommendationService.ts
    │   └── uploadService.ts
    ├── temp/
    │   └── uploads/            # Temporary file storage (UUID filenames)
    ├── types/
    │   └── index.ts            # Shared TypeScript interfaces & API contracts
    └── utils/                  # Core utility functions
        ├── ApiError.ts         # Operational error class
        ├── asyncHandler.ts     # Async controller wrapper
        ├── fileValidator.ts    # Magic-byte & extension validator
        ├── logger.ts           # Leveled structured logger
        ├── response.ts         # Standardized JSON response helpers
        └── tempStorage.ts      # Temporary file storage manager
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` or `v22.x`
- **npm**: `v9.x` or higher

### Installation
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Development Server
```bash
# Start backend dev server with tsx hot-reloading
npm run dev
```
*The server will start at `http://localhost:5000`.*

### Type Checking & Production Build
```bash
# Perform strict TypeScript typecheck
npm run typecheck

# Build JavaScript output to dist/
npm run build

# Start production server
npm start
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
API_VERSION=v1

# AI Model Integration Settings
# AI_PROVIDER supports: 'mock' (default for dev/testing) or 'http' (for external Python/FastAPI microservice)
AI_PROVIDER=mock
AI_SERVICE_URL=http://localhost:8000/predict
AI_TIMEOUT_MS=10000
```

---

## 📡 API Endpoint Summary

All API endpoints are mounted under `/api` (and accessible under `/api/v1` namespace).

| Route | Method | Description | Content-Type |
|---|---|---|---|
| `/` | `GET` | API Information & Status | `application/json` |
| `/api/health` | `GET` | Health Check, Uptime & System Memory | `application/json` |
| `/api/crops` | `GET` | Query Supported Crop Catalog | `application/json` |
| `/api/diseases` | `GET` | Query Disease Catalog (Supports `?crop=Tomato`) | `application/json` |
| `/api/predict/upload` | `POST` | Upload Crop Leaf Image (Max 5MB) | `multipart/form-data` or `image/*` |
| `/api/predict` | `POST` | Trigger AI Crop Disease Inference | `application/json` |
| `/api/recommendation` | `POST` | Resolve Agricultural Advice & Treatments | `application/json` |
| `/api/history` | `GET` | Query Recent Diagnostic Logs | `application/json` |

---

## 💡 Standard Response Format

### Success Response (`200 OK`)
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
    "prevention": [
      "Practice 3-year crop rotation with non-solanaceous plants",
      "Use drip irrigation instead of overhead sprinklers",
      "Maintain proper row spacing for foliage ventilation"
    ],
    "processingTime": "1.4 sec"
  },
  "requestId": "32103d66-7dbb-4566-9a01-9fa041f4e52f"
}
```

### Error Response (`400 / 404 / 500 / 503`)
```json
{
  "success": false,
  "message": "Uploaded image file for uploadId 'xyz' was not found or expired",
  "error": {
    "code": "NOT_FOUND",
    "details": "Uploaded image file for uploadId 'xyz' was not found or expired"
  },
  "requestId": "53210737-54ab-4254-a98e-ebe2496f7d55"
}
```

---

## 🔗 Integration Instructions for Frontend Developers

### Step 1: Upload Leaf Image
Send the image file to `POST /api/predict/upload`:
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/predict/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
const uploadId = result.data.uploadId; // Extract uploadId
```

### Step 2: Request Disease Prediction
Pass the `uploadId` to `POST /api/predict`:
```javascript
const response = await fetch('http://localhost:5000/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ uploadId }),
});

const prediction = await response.json();
console.log(prediction.data.crop); // "Tomato"
console.log(prediction.data.disease); // "Early Blight"
```

### Step 3: Fetch Detailed Treatment Recommendation
Pass `crop` and `disease` to `POST /api/recommendation`:
```javascript
const response = await fetch('http://localhost:5000/api/recommendation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ crop: "Tomato", disease: "Early Blight" }),
});

const advice = await response.json();
console.log(advice.data.treatment);
console.log(advice.data.organicAlternative);
```

---

## 🤖 Integration Instructions for AI Model Engineers

To connect a custom Python / FastAPI / PyTorch / TensorFlow microservice:

1. Update `.env`:
   ```env
   AI_PROVIDER=http
   AI_SERVICE_URL=http://your-python-service:8000/predict
   ```

2. Your AI HTTP microservice must accept `POST` JSON payloads:
   ```json
   {
     "uploadId": "f310bf17-3aa1-4c9e-ad70-4cdefe0f6d87",
     "imageBase64": "<base64_encoded_buffer>"
   }
   ```

3. Your AI service must return the following JSON contract:
   ```json
   {
     "crop": "Tomato",
     "disease": "Early Blight",
     "confidence": 98.4,
     "risk": "High",
     "recommendation": "Apply copper octanoate...",
     "prevention": ["Crop rotation", "Drip irrigation"],
     "processingTime": "0.8 sec"
   }
   ```

---

## 🛠️ Troubleshooting & Tips

- **Magic Byte Validation Error (`400 Bad Request`)**: Ensure the uploaded image is a valid JPG or PNG file. Disguised files (e.g. text file renamed to `.jpg`) will be rejected by magic-byte verification.
- **File Size Limit (`400 Bad Request`)**: Maximum allowed upload size is 5 MB.
- **CORS Error**: Update `CORS_ORIGIN` in `.env` to match your frontend dev server URL (e.g., `http://localhost:5173`).
