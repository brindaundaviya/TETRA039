import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
import type { IAiPredictionProvider } from './aiProvider.interface.js';
import { httpAiProvider } from './httpAiProvider.js';
import { mockAiProvider } from './mockAiProvider.js';

export function getAiPredictionProvider(overrideProviderName?: string): IAiPredictionProvider {
  const providerType = (overrideProviderName || env.aiProvider).toLowerCase();

  switch (providerType) {
    case 'http':
    case 'external':
      logger.info('Using HttpAiPredictionProvider for AI inference');
      return httpAiProvider;

    case 'mock':
    default:
      logger.info('Using MockAiPredictionProvider for AI inference');
      return mockAiProvider;
  }
}
