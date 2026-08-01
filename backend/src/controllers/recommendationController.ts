import type { Request, Response } from 'express';
import { recommendationService } from '../services/recommendationService.js';
import type { RecommendationRequestPayload } from '../types/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getRecommendation = asyncHandler(
  async (req: Request<Record<string, string>, unknown, RecommendationRequestPayload>, res: Response) => {
    const recommendation = await recommendationService.getRecommendation(req.body);
    return sendSuccess(res, recommendation, 'Recommendation generated successfully');
  }
);
