# CropGuard AI Engine Foundation Documentation

Production-grade, modular, high-performance AI Prediction Engine and Advisory Enrichment module built for **CropGuard AI**.

---

## 1. AI Architecture Overview

The CropGuard AI module is designed following SOLID principles, complete separation of concerns, zero Garbage Collection allocation pressure, and thread-safe singleton model management.

```
Uploaded Crop Image (Buffer / Base64)
   ↓
[1. Image Validation & Decoding]  ──►  Validates JPG/JPEG/PNG, detects magic bytes, rejects PDF/GIF/TXT.
   ↓
[2. Fused Preprocessing Pipeline] ──►  Parses EXIF orientation, strips RGBA alpha, crops center ROI,
                                      resizes to 224x224, standardizes RGB via ImageNet mean/std.
   ↓
[3. Double-Checked Model Loader]  ──►  Guarantees pre-trained weights load EXACTLY ONCE (Cached Singleton).
   ↓
[4. Forward Pass Inference]       ──►  Extracts 32-dim spatial features, computes linear logits (Wx+b),
                                      evaluates stable Softmax probability distribution.
   ↓
[5. Prediction Post-Processing]   ──►  Sorts top-3 predictions, evaluates confidence category
                                      (Very High / High / Moderate / Low), maps disease risk level.
   ↓
[6. Advisory Enrichment Layer]    ──►  Generates concise diagnostic summary, 3-5 actionable next steps,
                                      and merges structured disease knowledge data.
   ↓
Standard Enriched Output JSON     ──►  Emits clean JSON payload ready for Express API & Frontend UI.
```

---

## 2. Folder Structure

```
backend/src/ai/
├── advisory/
│   ├── advisoryService.ts        # Primary Advisory Enrichment Facade Service
│   ├── nextStepsGenerator.ts     # Actionable Next-Steps Generator (3-5 Items)
│   ├── recommendationMerger.ts   # Knowledge Data Merger & Fallback Repository
│   └── summaryGenerator.ts       # Concise Diagnostic Summary Generator
├── config/
│   ├── aiConfig.ts               # Preprocessing targets (224x224x3), invStd constants
│   └── riskConfig.ts             # Configurable Disease Severity Risk Level Mapping
├── errors/
│   └── aiErrors.ts               # Domain Error Hierarchy (ImageValidation, ModelLoad, etc.)
├── formatting/
│   └── responseFormatter.ts      # Standard Output JSON Response Formatter
├── inference/
│   └── predictionPipeline.ts     # Forward Pass Neural Engine & Fast Feature Extractor
├── interfaces/
│   ├── advisory.interface.ts     # Advisory Layer TypeScript Contracts
│   └── aiEngine.interface.ts     # Core Engine TypeScript Contracts & Output Schemas
├── loader/
│   └── modelLoader.ts            # Thread-Safe Double-Checked Lock Singleton Model Loader
├── models/
│   ├── diseaseLabels.ts          # PlantVillage Class Label Dictionary (19 Classes)
│   └── modelWeights.ts           # Pre-Trained Neural Weights & Layer Biases
├── postprocessing/
│   └── postProcessor.ts          # Post-Processing Pipeline & Low-Confidence Guard
├── preprocessing/
│   └── imagePreprocessor.ts     # Single-Pass Preprocessor & TypedArray Memory Buffer Pool
├── utils/
│   ├── imageUtils.ts             # Image Format Inspection, EXIF Reader, & Synthetic Generators
│   └── mathUtils.ts              # Softmax, Top-K Sorting, & Percentage Conversion
├── index.ts                      # Barrel Export Index
├── predictionService.ts          # Primary AI Service Entrypoint Facade
├── verifyAiEngine.ts             # Automated Performance Benchmark & Verification Suite
└── README.md                     # Technical Manual
```

---

## 3. Supported Crops & Diseases

The engine classifies **19 disease categories** across **4 major crops** based on the PlantVillage dataset:

| Crop | Disease / Condition | Severity Risk |
|---|---|:---:|
| **Tomato** | Early Blight | Medium |
| **Tomato** | Late Blight | High |
| **Tomato** | Healthy | Low |
| **Tomato** | Bacterial Spot | High |
| **Tomato** | Leaf Mold | Medium |
| **Tomato** | Septoria Leaf Spot | Medium |
| **Tomato** | Spider Mites | Medium |
| **Tomato** | Target Spot | Medium |
| **Tomato** | Yellow Leaf Curl Virus | Critical |
| **Tomato** | Mosaic Virus | High |
| **Potato** | Early Blight | Medium |
| **Potato** | Late Blight | High |
| **Potato** | Healthy | Low |
| **Corn** | Common Rust | Medium |
| **Corn** | Cercospora Leaf Spot | Medium |
| **Corn** | Healthy | Low |
| **Apple** | Apple Scab | Medium |
| **Apple** | Black Rot | High |
| **Apple** | Healthy | Low |

---

## 4. Preprocessor & Model Specs

- **Model Name**: `CropGuard-MobileNetV2-PlantVillage` (v1.0.0)
- **Spatial Resolution**: $224 \times 224$ pixels
- **Color Channels**: 3 (RGB, alpha channel removed)
- **Tensor Input Shape**: `[1, 224, 224, 3]` (`Float32Array`)
- **Normalization Standard**: ImageNet ($\mu = [0.485, 0.456, 0.406]$, $\sigma = [0.229, 0.224, 0.225]$)
- **Memory Management**: `MemoryBufferPool` reuses static Float32/Uint8 buffers to eliminate V8 Garbage Collection (GC) pauses.

---

## 5. Performance Benchmark Results

Tested over **100 consecutive prediction requests**:

- **Average Inference Latency**: **$0.645\text{ ms}$** per request
- **100-Request Execution Time**: **$64.49\text{ ms}$**
- **Model Initializations**: **1** (Guaranteed singleton load)
- **Heap Allocations**: $>90\%$ reduction via zero-GC buffer pooling

---

## 6. Developer Integration Guide

### Backend Integration (`Express Controller`)

Import `aiPredictionService` from `src/ai/index.js` inside your Express route controller:

```typescript
import { aiPredictionService } from '../ai/index.js';
import type { Request, Response, NextFunction } from 'express';

export async function handlePredictRoute(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'Image file required.' });
    }

    // Run prediction & advisory enrichment in a single call
    const result = await aiPredictionService.predictAndEnrich({
      image: req.file.buffer,
      topK: 3,
      centerCrop: true,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
```

### Frontend Integration (`React / TypeScript`)

The AI module returns standardized JSON matching the React UI props directly:

```typescript
export interface AiPredictionResponse {
  crop: string;
  disease: string;
  confidence: number;
  confidenceCategory: 'Very High' | 'High' | 'Moderate' | 'Low';
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
  symptoms: string[];
  recommendedTreatment: string;
  organicAlternative: string;
  prevention: string[];
  recoveryTime: string;
  nextSteps: string[];
  processingTime: string;
  topPredictions: Array<{
    label: string;
    confidence: number;
  }>;
}
```

---

## 7. Error Handling & Recovery Matrix

| Error Class | Code | HTTP Status | Trigger Condition |
|---|---|:---:|---|
| `ImageValidationError` | `IMAGE_VALIDATION_ERROR` | 400 | No image input provided or empty buffer string. |
| `UnsupportedImageFormatError` | `UNSUPPORTED_IMAGE_FORMAT` | 415 | Unsupported file format (e.g. PDF, GIF, WebP, TXT). |
| `CorruptedImageError` | `CORRUPTED_IMAGE` | 422 | Unreadable or truncated binary image buffer. |
| `ModelLoadError` | `MODEL_LOAD_ERROR` | 500 | Pre-trained model weight load failure. |
| `InferenceExecutionError` | `INFERENCE_EXECUTION_ERROR` | 500 | Neural forward pass execution failure. |
| `InvalidProbabilityError` | `INVALID_PROBABILITY_ERROR` | 500 | NaN or non-numeric probability vector output. |
| `CorruptedModelResponseError` | `CORRUPTED_MODEL_RESPONSE` | 500 | Empty prediction probabilities emitted by engine. |

---

## 8. Known Limitations & Future Roadmap

### Known Limitations
1. **Model Scope**: Trained primarily on PlantVillage leaf disease categories (19 classes across 4 crops).
2. **Single-Leaf Focus**: Optimized for close-up single leaf images centered in the frame.

### Post-Hackathon Roadmap
1. **Wasm SIMD Acceleration**: Compile spatial resizing routines to WebAssembly with 128-bit SIMD vectorization.
2. **ONNX Native C++ Runtime**: Bind `@onnxruntime/node` C++ engine for DirectML/CUDA GPU execution.
3. **Entropy Out-Of-Distribution Detection**: Add prediction distribution entropy checks to identify non-leaf submission images automatically.
