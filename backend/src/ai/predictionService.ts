import { AI_CONFIG } from './config/aiConfig.js';
import { defaultResponseFormatter } from './formatting/responseFormatter.js';
import { defaultInferenceEngine } from './inference/predictionPipeline.js';
import type {
  IImagePreprocessor,
  IInferenceEngine,
  IModelLoader,
  IResponseFormatter,
  ImageInput,
  PredictionInputOptions,
  StandardPredictionOutput,
} from './interfaces/aiEngine.interface.js';
import { defaultModelLoader } from './loader/modelLoader.js';
import { defaultImagePreprocessor } from './preprocessing/imagePreprocessor.js';

export class AiPredictionService {
  private readonly preprocessor: IImagePreprocessor;
  private readonly modelLoader: IModelLoader;
  private readonly inferenceEngine: IInferenceEngine;
  private readonly formatter: IResponseFormatter;

  constructor(
    preprocessor: IImagePreprocessor = defaultImagePreprocessor,
    modelLoader: IModelLoader = defaultModelLoader,
    inferenceEngine: IInferenceEngine = defaultInferenceEngine,
    formatter: IResponseFormatter = defaultResponseFormatter
  ) {
    this.preprocessor = preprocessor;
    this.modelLoader = modelLoader;
    this.inferenceEngine = inferenceEngine;
    this.formatter = formatter;
  }

  /**
   * Initialize and pre-warm model. Call during application startup if desired.
   */
  public async initialize(): Promise<void> {
    await this.modelLoader.loadModel();
  }

  /**
   * Run full AI prediction pipeline on an input leaf image.
   *
   * @param options Image buffer or Base64 string, or options object
   * @returns StandardPredictionOutput matching CropGuard AI output specification
   */
  public async predict(options: ImageInput | PredictionInputOptions): Promise<StandardPredictionOutput> {
    const inputImage: ImageInput =
      typeof options === 'object' && options !== null && 'image' in options ? options.image : (options as ImageInput);

    const topK =
      typeof options === 'object' && options !== null && 'topK' in options && options.topK
        ? options.topK
        : AI_CONFIG.defaultTopK;

    // Pipeline Step 1: Preprocess raw image buffer into tensor representation
    const tensor = await this.preprocessor.preprocess(inputImage);

    // Pipeline Step 2 & 3: Run Model forward pass & raw inference
    const rawOutput = await this.inferenceEngine.predict(tensor);

    // Pipeline Step 4 & 5: Format confidence scores, top predictions, and standard response JSON
    const result = this.formatter.format(rawOutput, topK);

    return result;
  }

  /**
   * Get metadata about current AI Engine model version and load status.
   */
  public getEngineStatus(): { isLoaded: boolean; modelInfo: { name: string; version: string } } {
    return {
      isLoaded: this.modelLoader.isLoaded(),
      modelInfo: this.modelLoader.getModelInfo(),
    };
  }
}

// Singleton instance export for easy backend plug-in
export const aiPredictionService = new AiPredictionService();
