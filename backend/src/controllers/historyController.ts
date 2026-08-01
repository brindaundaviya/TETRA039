import type { Request, Response } from 'express';
import { historyService } from '../services/historyService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getHistory = asyncHandler(async (_req: Request, res: Response) => {
  const history = await historyService.getHistory();
  return sendSuccess(res, history, 'Prediction history retrieved successfully');
});
