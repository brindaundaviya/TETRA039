import fs from 'node:fs/promises';
import path from 'node:path';
import type { AiPredictionData, PredictionRequestPayload } from '../types/index.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { TEMP_UPLOADS_DIR } from '../utils/tempStorage.js';
import type { PredictionInput } from './ai/aiProvider.interface.js';
import { getAiPredictionProvider } from './ai/aiProviderFactory.js';

export class PredictService {
  /**
   * Orchestrates disease prediction by retrieving image input and invoking the active AI provider adapter.
   */
  public async predict(request: PredictionRequestPayload): Promise<AiPredictionData> {
    const { uploadId, imageBase64, imageUrl, cropHint } = request;

    let predictionInput: PredictionInput;

    if (uploadId) {
      // Locate temporary file in temp uploads storage
      const uploadDir = TEMP_UPLOADS_DIR;
      let targetFile: string | null = null;

      try {
        const files = await fs.readdir(uploadDir);
        const matched = files.find((f) => f.startsWith(uploadId));
        if (matched) {
          targetFile = path.join(uploadDir, matched);
        }
      } catch (err) {
        logger.warn('Could not read temporary uploads directory', { err });
      }

      if (!targetFile) {
        throw ApiError.notFound(
          `Uploaded image file for uploadId '${uploadId}' was not found or expired. Please upload the image again.`
        );
      }

      const buffer = await fs.readFile(targetFile);
      predictionInput = {
        uploadId,
        imagePath: targetFile,
        imageBuffer: buffer,
        cropHint,
      };
    } else if (imageBase64) {
      const rawData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(rawData, 'base64');
      predictionInput = {
        imageBuffer: buffer,
        cropHint,
      };
    } else if (imageUrl) {
      predictionInput = {
        cropHint,
      };
    } else {
      throw ApiError.badRequest(
        'Missing request parameter. Please provide an uploadId, imageBase64, or imageUrl for prediction.'
      );
    }

    const provider = getAiPredictionProvider();
    logger.info(`Delegating crop disease prediction to provider: ${provider.providerName}`);

    const result = await provider.predict(predictionInput);
    return result;
  }
}

export const predictService = new PredictService();
