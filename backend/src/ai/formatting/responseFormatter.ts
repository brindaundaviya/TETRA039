import { AI_CONFIG } from '../config/aiConfig.js';
import type {
  IResponseFormatter,
  RawPredictionOutput,
  StandardPredictionOutput,
  TopPredictionItem,
} from '../interfaces/aiEngine.interface.js';
import { getDiseaseClassInfo } from '../models/diseaseLabels.js';
import { toPercentage } from '../utils/mathUtils.js';

export class CropGuardResponseFormatter implements IResponseFormatter {
  /**
   * Format raw neural model predictions into CropGuard AI Standard Output JSON format.
   */
  public format(rawOutput: RawPredictionOutput, topK = AI_CONFIG.defaultTopK): StandardPredictionOutput {
    const { classProbabilities, topIndices } = rawOutput;

    if (!topIndices || topIndices.length === 0) {
      throw new Error('[ResponseFormatter] Empty prediction indices received.');
    }

    // Identify primary top 1 prediction
    const topIdx = topIndices[0] ?? 0;
    const primaryProb = classProbabilities[topIdx] ?? 0;
    const primaryMeta = getDiseaseClassInfo(topIdx);

    // Format top K predictions list
    const topPredictions: TopPredictionItem[] = topIndices.slice(0, topK).map((idx) => {
      const prob = classProbabilities[idx] ?? 0;
      const meta = getDiseaseClassInfo(idx);

      return {
        name: meta.disease,
        confidence: toPercentage(prob, 1),
      };
    });

    const topConfidencePercentage = toPercentage(primaryProb, 1);

    return {
      crop: primaryMeta.crop,
      disease: primaryMeta.disease,
      confidence: topConfidencePercentage,
      topPredictions,
    };
  }
}

export const defaultResponseFormatter = new CropGuardResponseFormatter();
