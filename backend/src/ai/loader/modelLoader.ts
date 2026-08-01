import { AI_CONFIG } from '../config/aiConfig.js';
import type { IModelLoader } from '../interfaces/aiEngine.interface.js';
import { ModelLayerWeights, PRETRAINED_MODEL_WEIGHTS } from '../models/modelWeights.js';

export class PlantVillageModelLoader implements IModelLoader<ModelLayerWeights> {
  private modelInstance: ModelLayerWeights | null = null;
  private isModelLoaded = false;
  private readonly modelName: string;
  private readonly modelVersion: string;

  constructor(
    modelName = AI_CONFIG.modelName,
    modelVersion = AI_CONFIG.modelVersion
  ) {
    this.modelName = modelName;
    this.modelVersion = modelVersion;
  }

  /**
   * Load model weights asynchronously and execute model warmup.
   */
  public async loadModel(): Promise<ModelLayerWeights> {
    if (this.isModelLoaded && this.modelInstance) {
      return this.modelInstance;
    }

    // Simulate async model weight initialization / file reading
    await new Promise((resolve) => setTimeout(resolve, 20));

    this.modelInstance = PRETRAINED_MODEL_WEIGHTS;
    this.isModelLoaded = true;

    // Warmup model pass
    this.warmupModel(this.modelInstance);

    return this.modelInstance;
  }

  public isLoaded(): boolean {
    return this.isModelLoaded;
  }

  public getModelInfo(): { name: string; version: string } {
    return {
      name: this.modelName,
      version: this.modelVersion,
    };
  }

  private warmupModel(weights: ModelLayerWeights): void {
    // Perform quick initial matrix dot product to initialize JIT runtime
    const dummyFeature = new Float32Array(weights.featureDimension).fill(0.1);
    for (let c = 0; c < weights.numClasses; c++) {
      let score = weights.classBiases[c] ?? 0;
      const row = weights.classWeights[c];
      if (row) {
        for (let f = 0; f < weights.featureDimension; f++) {
          score += (dummyFeature[f] ?? 0) * (row[f] ?? 0);
        }
      }
    }
  }
}

export const defaultModelLoader = new PlantVillageModelLoader();
