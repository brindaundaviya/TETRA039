import type { Request, Response } from 'express';
import { diseaseService } from '../services/diseaseService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getDiseases = asyncHandler(async (_req: Request, res: Response) => {
  const diseases = await diseaseService.getDiseases();
  return sendSuccess(res, diseases, 'Diseases retrieved successfully');
});
