import { AI_CONFIG } from '../config/aiConfig.js';
import { getDiseaseRiskLevel } from '../config/riskConfig.js';
import { CorruptedModelResponseError, InvalidProbabilityError } from '../errors/aiErrors.js';
import type {
  ConfidenceCategory,
  RawPredictionOutput,
  RiskLevel,
  StandardPredictionOutput,
  TopPredictionItem,
} from '../interfaces/aiEngine.interface.js';
import { getDiseaseClassInfo } from '../models/diseaseLabels.js';
import { getTopKIndices, toPercentage } from '../utils/mathUtils.js';

export interface ProcessedPredictionResult {
  crop: string;
  disease: string;
  confidence: number;
  confidenceCategory: ConfidenceCategory;
  risk: RiskLevel;
  processingTime: string;
  topPredictions: TopPredictionItem[];
}

export class AiPostProcessor {
  /**
   * Execute post-processing pipeline on raw inference outputs.
   */
  public process(rawOutput: RawPredictionOutput, topK = AI_CONFIG.defaultTopK): StandardPredictionOutput {
    // Pipeline Step 1: Validate prediction vector & output structures
    this.validateRawPredictionOutput(rawOutput);

    const { classProbabilities, processingTimeMs } = rawOutput;

    // Pipeline Step 2: Sort probabilities & extract Top K class indices
    const topIndices = getTopKIndices(classProbabilities, topK);

    if (topIndices.length === 0) {
      throw new CorruptedModelResponseError('Failed to extract top prediction indices from probability vector.');
    }

    // Pipeline Step 3: Identify primary top 1 prediction
    const topIdx = topIndices[0] ?? 0;
    const primaryProb = classProbabilities[topIdx] ?? 0;
    const primaryMeta = getDiseaseClassInfo(topIdx);

    // Pipeline Step 4: Extract and format top predictions array (Top 3)
    const topPredictions: TopPredictionItem[] = topIndices.map((idx) => {
      const prob = classProbabilities[idx] ?? 0;
      const meta = getDiseaseClassInfo(idx);

      return {
        label: meta.disease,
        name: meta.disease,
        confidence: toPercentage(prob, 1),
      };
    });

    const primaryConfidencePercentage = toPercentage(primaryProb, 1);

    // Pipeline Step 5: Calculate confidence category (Very High, High, Moderate, Low)
    const confidenceCategory = this.evaluateConfidenceCategory(primaryConfidencePercentage);

    // Pipeline Step 6: Assign risk level from configurable risk mapping
    const risk = getDiseaseRiskLevel(primaryMeta.disease);

    // Pipeline Step 7: Format processing time string (e.g. "1.2 sec")
    const seconds = processingTimeMs / 1000;
    const formattedProcessingTime = seconds >= 0.1 ? `${seconds.toFixed(1)} sec` : `${seconds.toFixed(2)} sec`;

    return {
      crop: primaryMeta.crop,
      disease: primaryMeta.disease,
      confidence: primaryConfidencePercentage,
      confidenceCategory,
      risk,
      processingTime: formattedProcessingTime,
      topPredictions,
    };
  }

  /**
   * Validate raw model output for empty vectors, NaN/Infinity values, or corrupted structures.
   */
  private validateRawPredictionOutput(rawOutput: RawPredictionOutput): void {
    if (!rawOutput) {
      throw new CorruptedModelResponseError('Raw model output is null or undefined.');
    }

    const { classProbabilities } = rawOutput;

    if (!Array.isArray(classProbabilities) || classProbabilities.length === 0) {
      throw new CorruptedModelResponseError('Model emitted empty prediction probabilities vector.');
    }

    for (let i = 0; i < classProbabilities.length; i++) {
      const prob = classProbabilities[i];
      if (typeof prob !== 'number' || isNaN(prob) || !isFinite(prob)) {
        throw new InvalidProbabilityError(`Probability score at index ${i} is non-numeric or NaN.`);
      }
      if (prob < 0 || prob > 1.001) {
        throw new InvalidProbabilityError(`Probability score at index ${i} (${prob}) is outside normalized [0..1] range.`);
      }
    }
  }

  /**
   * Evaluate confidence category string based on percentage threshold:
   * 95–100%: "Very High"
   * 85–94%: "High"
   * 70–84%: "Moderate"
   * Below 70%: "Low"
   */
  public evaluateConfidenceCategory(confidencePercentage: number): ConfidenceCategory {
    if (confidencePercentage >= 95.0) {
      return 'Very High';
    }
    if (confidencePercentage >= 85.0) {
      return 'High';
    }
    if (confidencePercentage >= 70.0) {
      return 'Moderate';
    }
    return 'Low';
  }
}

export const defaultAiPostProcessor = new AiPostProcessor();
