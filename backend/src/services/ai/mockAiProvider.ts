import type { AiPredictionData } from '../../types/index.js';
import type { IAiPredictionProvider, PredictionInput } from './aiProvider.interface.js';

export class MockAiPredictionProvider implements IAiPredictionProvider {
  public readonly providerName = 'Mock-AI-Engine';

  public async predict(input: PredictionInput): Promise<AiPredictionData> {
    const startTime = Date.now();

    // Simulate minor processing delay (e.g. 200ms)
    await new Promise((resolve) => setTimeout(resolve, 200));

    const crop = input.cropHint ?? 'Tomato';
    const elapsedSeconds = ((Date.now() - startTime) / 1000 + 1.2).toFixed(1);

    return {
      crop,
      disease: 'Early Blight',
      confidence: 97.5,
      risk: 'High',
      recommendation:
        'Apply copper-based fungicide every 7-10 days. Prune infected lower foliage immediately to limit spore dissemination.',
      prevention: [
        'Practice 3-year crop rotation with non-solanaceous plants',
        'Use drip irrigation instead of overhead sprinklers to keep foliage dry',
        'Maintain proper row spacing to enhance airflow across plant canopy',
      ],
      processingTime: `${elapsedSeconds} sec`,
    };
  }
}

export const mockAiProvider = new MockAiPredictionProvider();
