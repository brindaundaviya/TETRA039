/**
 * AI Engine Configuration for CropGuard AI
 *
 * Defines model hyperparameters, preprocessing targets, default confidence thresholds,
 * and inference pipeline settings.
 */

export interface AiEngineConfig {
  readonly modelName: string;
  readonly modelVersion: string;
  readonly targetImageWidth: number;
  readonly targetImageHeight: number;
  readonly targetChannels: number;
  readonly defaultTopK: number;
  readonly minConfidenceThreshold: number;
  readonly normalization: {
    readonly scale: number;
    readonly mean: [number, number, number];
    readonly std: [number, number, number];
  };
}

export const AI_CONFIG: AiEngineConfig = {
  modelName: 'CropGuard-MobileNetV2-PlantVillage',
  modelVersion: '1.0.0',
  targetImageWidth: 224,
  targetImageHeight: 224,
  targetChannels: 3,
  defaultTopK: 3,
  minConfidenceThreshold: 0.1,
  normalization: {
    scale: 255.0,
    mean: [0.485, 0.456, 0.406], // ImageNet standard RGB mean
    std: [0.229, 0.224, 0.225],  // ImageNet standard RGB std
  },
};
