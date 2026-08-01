/**
 * AI Engine Configuration for CropGuard AI
 *
 * Defines model hyperparameters, preprocessing targets, default confidence thresholds,
 * and optimized pre-computed normalization constants.
 */

export interface AiEngineConfig {
  readonly modelName: string;
  readonly modelVersion: string;
  readonly targetImageWidth: number;
  readonly targetImageHeight: number;
  readonly targetChannels: number;
  readonly defaultTopK: number;
  readonly minConfidenceThreshold: number;
  readonly lowConfidenceThreshold: number;
  readonly normalization: {
    readonly scale: number;
    readonly mean: [number, number, number];
    readonly std: [number, number, number];
    readonly invStd: [number, number, number]; // Pre-computed 1 / std for fast multiplication
  };
}

const MEAN_RGB: [number, number, number] = [0.485, 0.456, 0.406];
const STD_RGB: [number, number, number] = [0.229, 0.224, 0.225];

export const AI_CONFIG: AiEngineConfig = {
  modelName: 'CropGuard-MobileNetV2-PlantVillage',
  modelVersion: '1.0.0',
  targetImageWidth: 224,
  targetImageHeight: 224,
  targetChannels: 3,
  defaultTopK: 3,
  minConfidenceThreshold: 0.1,
  lowConfidenceThreshold: 35.0,
  normalization: {
    scale: 255.0,
    mean: MEAN_RGB,
    std: STD_RGB,
    invStd: [1 / STD_RGB[0], 1 / STD_RGB[1], 1 / STD_RGB[2]],
  },
};
