import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import type { AppError } from '../types/index.js';
import { logger } from '../utils/logger.js';
import { sendError } from '../utils/response.js';

export function notFoundHandler(req: Request, res: Response): void {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  sendError(res, message, 404, 'NOT_FOUND');
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  logger.error(`[${req.method}] ${req.originalUrl} - ${statusCode} - ${message}`, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: env.isDevelopment ? err.stack : undefined,
  });

  sendError(
    res,
    message,
    statusCode,
    statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : message,
    env.isDevelopment ? err.stack : undefined
  );
}
