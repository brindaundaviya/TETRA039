/**
 * CropGuard AI Engine Foundation Barrel Export
 *
 * Production-Quality Image Preprocessing, Inference, & Post-Processing Pipeline Module.
 */

// Configuration & Risk Mapping
export { AI_CONFIG, type AiEngineConfig } from './config/aiConfig.js';
export { DEFAULT_RISK_LEVEL, DISEASE_RISK_MAP, getDiseaseRiskLevel } from './config/riskConfig.js';

// Custom Error Classes
export {
  AiEngineError,
  CorruptedImageError,
  CorruptedModelResponseError,
  ImageValidationError,
  InferenceExecutionError,
  InvalidProbabilityError,
  ModelLoadError,
  PostProcessingError,
  UnsupportedImageFormatError,
} from './errors/aiErrors.js';

// Core Interfaces
export type {
  ConfidenceCategory,
  CropDiseaseClassInfo,
  IImagePreprocessor,
  IInferenceEngine,
  IModelLoader,
  ImageInput,
  IResponseFormatter,
  PredictionInputOptions,
  PreprocessingOptions,
  PreprocessedTensorData,
  RawPredictionOutput,
  RiskLevel,
  StandardPredictionOutput,
  TopPredictionItem,
} from './interfaces/aiEngine.interface.js';

// Component Implementations
export { CropGuardResponseFormatter, defaultResponseFormatter } from './formatting/responseFormatter.js';
export { PlantVillageInferenceEngine, defaultInferenceEngine } from './inference/predictionPipeline.js';
export { PlantVillageModelLoader, defaultModelLoader } from './loader/modelLoader.js';
export { CROP_DISEASE_LABELS, getDiseaseClassInfo } from './models/diseaseLabels.js';
export { AiPostProcessor, defaultAiPostProcessor, type ProcessedPredictionResult } from './postprocessing/postProcessor.js';
export { CropImagePreprocessor, defaultImagePreprocessor } from './preprocessing/imagePreprocessor.js';

// Primary Facade Service
export { AiPredictionService, aiPredictionService } from './predictionService.js';

// Utilities
export {
  checkPngAlphaChannel,
  createSyntheticLeafBuffer,
  detectSupportedFormat,
  normalizeAndValidateImage,
  parseExifOrientation,
} from './utils/imageUtils.js';
export { getTopKIndices, softmax, toPercentage } from './utils/mathUtils.js';
