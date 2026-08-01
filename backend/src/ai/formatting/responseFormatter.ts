import { AI_CONFIG } from '../config/aiConfig.js';
import type {
  IResponseFormatter,
  RawPredictionOutput,
  StandardPredictionOutput,
} from '../interfaces/aiEngine.interface.js';
import { AiPostProcessor, defaultAiPostProcessor } from '../postprocessing/postProcessor.js';

export class CropGuardResponseFormatter implements IResponseFormatter {
  private readonly postProcessor: AiPostProcessor;

  constructor(postProcessor: AiPostProcessor = defaultAiPostProcessor) {
    this.postProcessor = postProcessor;
  }

  /**
   * Format raw neural predictions into CropGuard AI Standard Output JSON format
   * using the post-processing pipeline.
   */
  public format(rawOutput: RawPredictionOutput, topK = AI_CONFIG.defaultTopK): StandardPredictionOutput {
    return this.postProcessor.process(rawOutput, topK);
  }
}

export const defaultResponseFormatter = new CropGuardResponseFormatter();
