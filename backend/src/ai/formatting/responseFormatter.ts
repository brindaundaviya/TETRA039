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
   * Format raw neural predictions into CropGuard AI Standard Output JSON format.
   * Top predictions include 'label' and 'confidence', and processingTime is formatted as a string (e.g. "1.2 sec").
   */
  public format(rawOutput: RawPredictionOutput, topK = AI_CONFIG.defaultTopK): StandardPredictionOutput {
    const { classProbabilities, topIndices, processingTimeMs } = rawOutput;

    if (!topIndices || topIndices.length === 0) {
      throw new Error('[ResponseFormatter] Empty prediction indices received.');
    }

    // Identify primary top 1 prediction
    const topIdx = topIndices[0] ?? 0;
    const primaryProb = classProbabilities[topIdx] ?? 0;
    const primaryMeta = getDiseaseClassInfo(topIdx);

    // Format top K predictions list with 'label' (and 'name' for compatibility)
    const topPredictions: TopPredictionItem[] = topIndices.slice(0, topK).map((idx) => {
      const prob = classProbabilities[idx] ?? 0;
      const meta = getDiseaseClassInfo(idx);

      return {
        label: meta.disease,
        name: meta.disease,
        confidence: toPercentage(prob, 1),
      };
    });

    const topConfidencePercentage = toPercentage(primaryProb, 1);

    // Format processing time string (e.g. "1.2 sec" or "0.05 sec")
    const seconds = processingTimeMs / 1000;
    const formattedTime = seconds >= 0.1 ? `${seconds.toFixed(1)} sec` : `${seconds.toFixed(2)} sec`;

    return {
      crop: primaryMeta.crop,
      disease: primaryMeta.disease,
      confidence: topConfidencePercentage,
      topPredictions,
      processingTime: formattedTime,
    };
  }
}

export const defaultResponseFormatter = new CropGuardResponseFormatter();
