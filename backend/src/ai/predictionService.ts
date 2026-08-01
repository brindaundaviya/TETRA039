import { AI_CONFIG } from './config/aiConfig.js';
import { AiEngineError } from './errors/aiErrors.js';
import { defaultResponseFormatter } from './formatting/responseFormatter.js';
import { defaultInferenceEngine } from './inference/predictionPipeline.js';
import type {
  IImagePreprocessor,
  IInferenceEngine,
  IModelLoader,
  IResponseFormatter,
  ImageInput,
  PredictionInputOptions,
  PreprocessingOptions,
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
   * Pre-load AI model during backend startup (guarantees model is loaded ONCE).
   */
  public async initialize(): Promise<void> {
    await this.modelLoader.loadModel();
  }

  /**
   * Run production AI prediction pipeline on an input crop leaf image.
   * Execution Flow:
   * 1. Validate Image (File exists, JPG/JPEG/PNG format check, corrupted buffer check).
   * 2. Preprocess Image (EXIF orientation, strip alpha RGBA->RGB, center crop, resize to 224x224, normalize).
   * 3. Run Inference (Reuse single loaded model instance, compute Wx+b logits, softmax).
   * 4. Decode & Format Predictions (Map class IDs to crop/disease, calculate topK, format processing time).
   *
   * @param options Image buffer or Base64 string, or PredictionInputOptions object
   * @returns StandardPredictionOutput matching exact CropGuard AI JSON specification
   */
  public async predict(options: ImageInput | PredictionInputOptions): Promise<StandardPredictionOutput> {
    try {
      const inputImage: ImageInput =
        typeof options === 'object' && options !== null && 'image' in options ? options.image : (options as ImageInput);

      const topK =
        typeof options === 'object' && options !== null && 'topK' in options && options.topK
          ? options.topK
          : AI_CONFIG.defaultTopK;

      const centerCrop =
        typeof options === 'object' && options !== null && 'centerCrop' in options && options.centerCrop !== undefined
          ? options.centerCrop
          : true;

      const preprocessOpts: PreprocessingOptions = {
        centerCrop,
        stripAlpha: true,
      };

      // Step 1 & 2: Validate image and preprocess into tensor representation
      const tensor = await this.preprocessor.preprocess(inputImage, preprocessOpts);

      // Step 3: Run Model Forward Pass & Raw Inference (Model is loaded ONCE & reused)
      const rawOutput = await this.inferenceEngine.predict(tensor);

      // Step 4: Decode predictions & format standard JSON response
      const result = this.formatter.format(rawOutput, topK);

      return result;
    } catch (err) {
      if (err instanceof AiEngineError) {
        throw err;
      }
      throw err;
    }
  }

  /**
   * Get metadata about AI Engine model version, load status, and total load count.
   */
  public getEngineStatus(): { isLoaded: boolean; modelInfo: { name: string; version: string; loadCount?: number } } {
    return {
      isLoaded: this.modelLoader.isLoaded(),
      modelInfo: this.modelLoader.getModelInfo(),
    };
  }
}

// Singleton instance export for backend integration
export const aiPredictionService = new AiPredictionService();
