import type { Request, Response } from 'express';
import { diseaseService } from '../services/diseaseService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getDiseases = asyncHandler(async (req: Request, res: Response) => {
  const cropFilter = typeof req.query.crop === 'string' ? req.query.crop : undefined;
  const diseases = await diseaseService.getDiseases(cropFilter);
  return sendSuccess(res, diseases, 'Diseases retrieved successfully');
});
