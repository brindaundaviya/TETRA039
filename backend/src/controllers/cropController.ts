import type { Request, Response } from 'express';
import { cropService } from '../services/cropService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getCrops = asyncHandler(async (_req: Request, res: Response) => {
  const crops = await cropService.getCrops();
  return sendSuccess(res, crops, 'Crops retrieved successfully');
});
