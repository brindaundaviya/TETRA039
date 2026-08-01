/**
 * Core interfaces for the CropGuard AI Engine Foundation.
 * Designed for SOLID principles, modularity, and plug-and-play model replacement.
 */

/**
 * Standard prediction result item in top predictions array.
 */
export interface TopPredictionItem {
  name: string;
  confidence: number;
}

/**
 * Standardized AI Output Schema as mandated by CropGuard AI specification.
 */
export interface StandardPredictionOutput {
  crop: string;
  disease: string;
  confidence: number;
  topPredictions: TopPredictionItem[];
}

/**
 * Flexible input format for AI image prediction.
 */
export type ImageInput = Buffer | string;

/**
 * Structured image input with optional hints.
 */
export interface PredictionInputOptions {
  image: ImageInput;
  cropHint?: string;
  topK?: number;
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
  preprocess(input: ImageInput): Promise<PreprocessedTensorData>;
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
