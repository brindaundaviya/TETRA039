import type { StandardPredictionOutput } from '../interfaces/aiEngine.interface.js';
import type { ISummaryGenerator } from '../interfaces/advisory.interface.js';

export class CropGuardSummaryGenerator implements ISummaryGenerator {
  /**
   * Generate concise 1-2 sentence diagnostic summary.
   */
  public generateSummary(prediction: StandardPredictionOutput): string {
    const { crop, disease, confidenceCategory } = prediction;
    const isHealthy = disease.toLowerCase().includes('healthy');

    const cropName = crop || 'Crop';
    const categoryLower = confidenceCategory ? confidenceCategory.toLowerCase() : 'moderate';

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
