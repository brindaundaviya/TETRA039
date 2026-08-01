import { AI_CONFIG } from '../config/aiConfig.js';
import { ModelLoadError } from '../errors/aiErrors.js';
import type { IModelLoader } from '../interfaces/aiEngine.interface.js';
import { ModelLayerWeights, PRETRAINED_MODEL_WEIGHTS } from '../models/modelWeights.js';

export class PlantVillageModelLoader implements IModelLoader<ModelLayerWeights> {
  private modelInstance: ModelLayerWeights | null = null;
  private isModelLoaded = false;
  private isInitializing = false;
  private loadPromise: Promise<ModelLayerWeights> | null = null;
  private loadCount = 0;
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
   * Thread-safe model loader ensuring the model is loaded ONCE and reused across all requests.
   */
  public async loadModel(): Promise<ModelLayerWeights> {
    // 1. Return cached model instance immediately if already loaded
    if (this.isModelLoaded && this.modelInstance) {
      return this.modelInstance;
    }

    // 2. Prevent race conditions: return in-flight loading promise if initialization is in progress
    if (this.isInitializing && this.loadPromise) {
      return this.loadPromise;
    }

    // 3. Initiate single model loading sequence
    this.isInitializing = true;
    this.loadPromise = (async () => {
      try {
        // Simulate async weight loading / model file reading
        await new Promise((resolve) => setTimeout(resolve, 20));

        this.modelInstance = PRETRAINED_MODEL_WEIGHTS;
        this.isModelLoaded = true;
        this.isInitializing = false;
        this.loadCount++;

        // Warm up JIT execution engine
        this.warmupModel(this.modelInstance);

        return this.modelInstance;
      } catch (err) {
        this.isInitializing = false;
        this.loadPromise = null;
        const message = err instanceof Error ? err.message : String(err);
        throw new ModelLoadError(message);
      }
    })();

    return this.loadPromise;
  }

  public isLoaded(): boolean {
    return this.isModelLoaded;
  }

  public getLoadCount(): number {
    return this.loadCount;
  }

  public getModelInfo(): { name: string; version: string; loadCount: number } {
    return {
      name: this.modelName,
      version: this.modelVersion,
      loadCount: this.loadCount,
    };
  }

  private warmupModel(weights: ModelLayerWeights): void {
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
