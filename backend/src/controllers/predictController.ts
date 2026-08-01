import type { Request, Response } from 'express';
import { predictService } from '../services/predictService.js';
import { uploadService } from '../services/uploadService.js';
import type { PredictionRequestPayload } from '../types/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const predictCropDisease = asyncHandler(
  async (req: Request<Record<string, string>, unknown, PredictionRequestPayload>, res: Response) => {
    const prediction = await predictService.predict(req.body);
    return sendSuccess(res, prediction, 'Prediction completed successfully');
  }
);

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const metadata = await uploadService.processUpload(req.file);
  return sendSuccess(res, metadata, 'Image uploaded successfully');
});
