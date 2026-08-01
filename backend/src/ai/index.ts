/**
 * CropGuard AI Engine Foundation Barrel Export
 *
 * Plug-and-play AI Module for Crop Disease Image Inference.
 */

// Configuration
export { AI_CONFIG, type AiEngineConfig } from './config/aiConfig.js';

// Core Interfaces
export type {
  CropDiseaseClassInfo,
  IImagePreprocessor,
  IInferenceEngine,
  IModelLoader,
  ImageInput,
  IResponseFormatter,
  PredictionInputOptions,
  PreprocessedTensorData,
  RawPredictionOutput,
  StandardPredictionOutput,
  TopPredictionItem,
} from './interfaces/aiEngine.interface.js';

// Individual Component Implementations
export { CropGuardResponseFormatter, defaultResponseFormatter } from './formatting/responseFormatter.js';
export { PlantVillageInferenceEngine, defaultInferenceEngine } from './inference/predictionPipeline.js';
export { PlantVillageModelLoader, defaultModelLoader } from './loader/modelLoader.js';
export { CropDiseaseClassInfo as DiseaseLabels } from './interfaces/aiEngine.interface.js';
export { CROP_DISEASE_LABELS, getDiseaseClassInfo } from './models/diseaseLabels.js';
export { CropImagePreprocessor, defaultImagePreprocessor } from './preprocessing/imagePreprocessor.js';

// Main Service Facade (Primary Plugin Point)
export { AiPredictionService, aiPredictionService } from './predictionService.js';

// Utilities
export { createSyntheticLeafBuffer, detectImageFormat, normalizeImageToBuffer } from './utils/imageUtils.js';
export { getTopKIndices, softmax, toPercentage } from './utils/mathUtils.js';
