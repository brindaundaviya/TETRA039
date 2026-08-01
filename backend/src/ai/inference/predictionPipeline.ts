import { AI_CONFIG } from '../config/aiConfig.js';
import { InferenceExecutionError } from '../errors/aiErrors.js';
import type {
  IInferenceEngine,
  IModelLoader,
  PreprocessedTensorData,
  RawPredictionOutput,
} from '../interfaces/aiEngine.interface.js';
import { defaultModelLoader } from '../loader/modelLoader.js';
import type { ModelLayerWeights } from '../models/modelWeights.js';
import { getTopKIndices, softmax } from '../utils/mathUtils.js';

export class PlantVillageInferenceEngine implements IInferenceEngine {
  private readonly modelLoader: IModelLoader<ModelLayerWeights>;

  constructor(modelLoader: IModelLoader<ModelLayerWeights> = defaultModelLoader) {
    this.modelLoader = modelLoader;
  }

  /**
   * Execute neural model forward pass prediction on preprocessed image tensor data.
   */
  public async predict(tensor: PreprocessedTensorData): Promise<RawPredictionOutput> {
    const startTime = performance.now();

    try {
      // 1. Fetch pre-trained model instance (guaranteed loaded once via Singleton model loader)
      const model = await this.modelLoader.loadModel();

      // 2. Extract feature representation vector from spatial RGB tensor
      const features = this.extractLeafFeatures(tensor, model.featureDimension);

      // 3. Forward pass: compute linear class logit scores (Wx + b)
      const logits: number[] = new Array(model.numClasses);

      for (let c = 0; c < model.numClasses; c++) {
        let logit = model.classBiases[c] ?? 0;
        const weightRow = model.classWeights[c];
        if (weightRow) {
          for (let f = 0; f < model.featureDimension; f++) {
            logit += (features[f] ?? 0) * (weightRow[f] ?? 0);
          }
        }
        logits[c] = logit;
      }

      // 4. Softmax probability activation
      const classProbabilities = softmax(logits);

      // 5. Select top K prediction indices
      const topIndices = getTopKIndices(classProbabilities, AI_CONFIG.defaultTopK);

      const endTime = performance.now();
      const processingTimeMs = Math.max(0.1, Math.round((endTime - startTime) * 10) / 10);

      return {
        classProbabilities,
        topIndices,
        processingTimeMs,
      };
    } catch (err) {
      if (err instanceof InferenceExecutionError) throw err;
      const message = err instanceof Error ? err.message : String(err);
      throw new InferenceExecutionError(message);
    }
  }

  /**
   * Extract 32-dimensional spatial visual feature vector from preprocessed leaf tensor.
   */
  private extractLeafFeatures(tensor: PreprocessedTensorData, featureDim: number): Float32Array {
    const features = new Float32Array(featureDim);
    const data = tensor.data;
    const numPixels = tensor.width * tensor.height;

    let sumR = 0, sumG = 0, sumB = 0;
    let brownSpotPixels = 0;
    let yellowMarginPixels = 0;
    let darkLesionPixels = 0;

    for (let i = 0; i < data.length; i += 3) {
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;

      sumR += r;
      sumG += g;
      sumB += b;

      // Concentric brown spot markers (Early Blight signature)
      if (r > 0.1 && g < 0.2 && b < 0.1) {
        brownSpotPixels++;
      }
      // Chlorotic yellowing (Yellow Leaf Curl signature)
      if (r > 0.2 && g > 0.2 && b < -0.1) {
        yellowMarginPixels++;
      }
      // Dark necrotized lesions (Late Blight signature)
      if (r < -0.3 && g < -0.3 && b < -0.3) {
        darkLesionPixels++;
      }
    }

    const meanR = sumR / numPixels;
    const meanG = sumG / numPixels;
    const meanB = sumB / numPixels;

    features[0] = meanR;
    features[1] = meanG;
    features[2] = meanB;
    features[3] = brownSpotPixels / numPixels;
    features[4] = yellowMarginPixels / numPixels;
    features[5] = darkLesionPixels / numPixels;

    for (let f = 6; f < featureDim; f++) {
      const idx = (f * 17) % data.length;
      features[f] = (data[idx] ?? 0) * Math.cos(f * 0.5);
    }

    return features;
  }
}

export const defaultInferenceEngine = new PlantVillageInferenceEngine();
