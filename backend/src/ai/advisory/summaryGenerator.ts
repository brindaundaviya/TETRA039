import { AI_CONFIG } from '../config/aiConfig.js';
import type { StandardPredictionOutput } from '../interfaces/aiEngine.interface.js';
import type { ISummaryGenerator } from '../interfaces/advisory.interface.js';

export class CropGuardSummaryGenerator implements ISummaryGenerator {
  /**
   * Generate concise 1-2 sentence diagnostic summary with low-confidence advice.
   */
  public generateSummary(prediction: StandardPredictionOutput): string {
    const { crop, disease, confidence, confidenceCategory } = prediction;
    const isHealthy = disease.toLowerCase().includes('healthy');

    const cropName = crop || 'Crop';
    const categoryLower = confidenceCategory ? confidenceCategory.toLowerCase() : 'moderate';

    // Edge Case: Low confidence prediction (< 35%)
    if (confidence < AI_CONFIG.lowConfidenceThreshold) {
      return `Possible signs of ${disease} were detected on the ${cropName} leaf with low confidence (${confidence.toFixed(1)}%). Re-take photo in bright lighting with the leaf centered.`;
    }

    if (isHealthy) {
      return `The uploaded ${cropName} leaf appears to be healthy with ${categoryLower} confidence.`;
    }

    if (confidenceCategory === 'Very High' || confidenceCategory === 'High') {
      return `The uploaded ${cropName} leaf is highly likely to be affected by ${disease} with ${categoryLower} confidence.`;
    }

    return `Possible symptoms of ${disease} were detected on the ${cropName} leaf with ${categoryLower} confidence.`;
  }
}

export const defaultSummaryGenerator = new CropGuardSummaryGenerator();
