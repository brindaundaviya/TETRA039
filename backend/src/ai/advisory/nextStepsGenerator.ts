import type { StandardPredictionOutput } from '../interfaces/aiEngine.interface.js';
import type { DiseaseKnowledgeData, INextStepsGenerator } from '../interfaces/advisory.interface.js';

export class CropGuardNextStepsGenerator implements INextStepsGenerator {
  /**
   * Generate 3-5 practical, actionable next steps for crop management.
   */
  public generateNextSteps(
    prediction: StandardPredictionOutput,
    knowledge?: DiseaseKnowledgeData
  ): string[] {
    const { disease, risk } = prediction;
    const isHealthy = disease.toLowerCase().includes('healthy');

    if (isHealthy) {
      return [
        'Continue regular monitoring and optimal watering schedules',
        'Maintain proper plant spacing for adequate air circulation',
        'Apply balanced organic fertilizer according to soil requirements',
        'Inspect leaf undersides weekly for early pest or disease signs',
      ];
    }

    const nextSteps: string[] = [];

    // Step 1: Immediate Sanitation / Pruning Action
    if (risk === 'High' || risk === 'Critical') {
      nextSteps.push(`Immediately isolate infected plants and prune severely damaged leaves to curb disease spread.`);
    } else {
      nextSteps.push(`Carefully remove and destroy infected lower leaves showing visible spots or lesions.`);
    }

    // Step 2: Irrigation & Moisture Management
    nextSteps.push(`Avoid overhead watering; irrigate directly at the soil base early in the morning to keep foliage dry.`);

    // Step 3: Targeted Treatment Action
    if (knowledge?.organicAlternative) {
      nextSteps.push(`Apply ${knowledge.organicAlternative} or targeted treatment spray evenly across healthy and infected foliage.`);
    } else if (knowledge?.treatment) {
      nextSteps.push(`Apply recommended treatment (${knowledge.treatment}) according to package instructions.`);
    } else {
      nextSteps.push(`Apply appropriate copper-based fungicide or bio-fungicide at first sign of disease symptoms.`);
    }

    // Step 4: Surrounding Crop Safeguard & Monitoring
    nextSteps.push(`Inspect surrounding healthy plants daily to catch early signs of secondary infection.`);

    // Step 5: Follow-up & Evaluation
    nextSteps.push(`Re-evaluate plant condition in 5–7 days to monitor recovery progress.`);

    return nextSteps;
  }
}

export const defaultNextStepsGenerator = new CropGuardNextStepsGenerator();
