/**
 * Core interfaces for the CropGuard AI Engine Foundation.
 * Designed for SOLID principles, modularity, and plug-and-play model replacement.
 */

/**
 * Confidence Category ranges:
 * 95–100%: "Very High"
 * 85–94%: "High"
 * 70–84%: "Moderate"
 * Below 70%: "Low"
 */
export type ConfidenceCategory = 'Very High' | 'High' | 'Moderate' | 'Low';

/**
 * Severity Risk Levels mapped to disease conditions.
 */
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

/**
 * Standard prediction result item in top predictions array.
 */
export interface TopPredictionItem {
  label: string;
  name?: string; // Backwards compatibility
  confidence: number;
}

/**
 * Standardized AI Output Schema as mandated by CropGuard AI specification.
 */
export interface StandardPredictionOutput {
  crop: string;
  disease: string;
  confidence: number;
  confidenceCategory: ConfidenceCategory;
  risk: RiskLevel;
  processingTime: string;
  topPredictions: TopPredictionItem[];
}

/**
 * Flexible input format for AI image prediction.
 */
export type ImageInput = Buffer | string;

/**
 * Structured image input with optional hints and configuration options.
 */
export interface PredictionInputOptions {
  image: ImageInput;
  cropHint?: string;
  topK?: number;
  centerCrop?: boolean;
}

/**
 * Configurable preprocessor settings.
 */
export interface PreprocessingOptions {
  targetWidth?: number;
  targetHeight?: number;
  targetChannels?: number;
  centerCrop?: boolean;
  stripAlpha?: boolean;
}

/**
 * Preprocessed tensor numerical data ready for model inference.
 */
export interface PreprocessedTensorData {
  data: Float32Array;
  width: number;
  height: number;
  channels: number;
  shape: [number, number, number, number]; // [Batch, Height, Width, Channels]
}

/**
 * Raw output logit/probability prediction score vector from model execution.
 */
export interface RawPredictionOutput {
  classProbabilities: number[];
  topIndices: number[];
  processingTimeMs: number;
}

/**
 * Disease metadata definition.
 */
export interface CropDiseaseClassInfo {
  id: number;
  crop: string;
  disease: string;
  fullName: string;
  isHealthy: boolean;
}

/**
 * Preprocessor interface contract.
 */
export interface IImagePreprocessor {
  preprocess(input: ImageInput, options?: PreprocessingOptions): Promise<PreprocessedTensorData>;
}

/**
 * Model Loader interface contract allowing seamless swapping of model implementations.
 */
export interface IModelLoader<TModel = unknown> {
  loadModel(): Promise<TModel>;
  isLoaded(): boolean;
  getModelInfo(): { name: string; version: string };
}

/**
 * Inference Engine interface contract.
 */
export interface IInferenceEngine {
  predict(tensor: PreprocessedTensorData): Promise<RawPredictionOutput>;
}

/**
 * Response Formatter interface contract.
 */
export interface IResponseFormatter {
  format(rawOutput: RawPredictionOutput, topK?: number): StandardPredictionOutput;
}
