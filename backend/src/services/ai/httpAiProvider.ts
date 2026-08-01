import { env } from '../../config/env.js';
import type { AiPredictionData } from '../../types/index.js';
import { ApiError } from '../../utils/ApiError.js';
import { logger } from '../../utils/logger.js';
import type { IAiPredictionProvider, PredictionInput } from './aiProvider.interface.js';

export class HttpAiPredictionProvider implements IAiPredictionProvider {
  public readonly providerName = 'External-HTTP-AI-Service';

  public async predict(input: PredictionInput): Promise<AiPredictionData> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), env.aiTimeoutMs);

    try {
      logger.info(`Sending image to external AI prediction service: ${env.aiServiceUrl}`);

      const payload = {
        uploadId: input.uploadId,
        cropHint: input.cropHint,
        imageBase64: input.imageBuffer ? input.imageBuffer.toString('base64') : undefined,
      };

      const response = await fetch(env.aiServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'CropGuard-Backend-AI-Adapter/1.0',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        logger.error(`External AI service returned non-200 status: ${response.status}`);
        if (response.status === 503 || response.status === 502) {
          throw new ApiError(503, 'External AI prediction service is temporarily unavailable');
        }
        throw new ApiError(502, `External AI service error (${response.status})`);
      }

      const rawData = (await response.json()) as Partial<AiPredictionData>;

      // Validate required response fields from AI contract
      if (!rawData || typeof rawData !== 'object' || !rawData.crop || !rawData.disease) {
        throw new ApiError(
          502,
          'AI service returned an invalid or incomplete prediction response payload'
        );
      }

      return {
        crop: String(rawData.crop),
        disease: String(rawData.disease),
        confidence: typeof rawData.confidence === 'number' ? rawData.confidence : 95.0,
        risk: String(rawData.risk || 'Medium'),
        recommendation: String(rawData.recommendation || 'No specific recommendation provided'),
        prevention: Array.isArray(rawData.prevention)
          ? rawData.prevention.map(String)
          : ['Follow standard agronomic practices'],
        processingTime: String(rawData.processingTime || '1.0 sec'),
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error.name === 'AbortError') {
        logger.error(`External AI service request timed out after ${env.aiTimeoutMs}ms`);
        throw new ApiError(504, `AI Prediction Service timed out after ${env.aiTimeoutMs / 1000}s`);
      }

      logger.error('Failed to communicate with external AI service', { error: error.message });
      throw new ApiError(503, 'AI Prediction Service is currently unavailable');
    }
  }
}

export const httpAiProvider = new HttpAiPredictionProvider();
