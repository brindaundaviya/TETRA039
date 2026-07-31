import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import type { ApiResponse, AppError } from '../types/index.js';
import { logger } from '../utils/logger.js';

export function notFoundHandler(_req: Request, res: Response): void {
  const response: ApiResponse = {
    success: false,
    error: 'Route not found',
    message: 'The requested resource does not exist',
  };
  res.status(404).json(response);
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || 'Internal server error';

  logger.error(message, {
    statusCode,
    stack: env.isDevelopment ? err.stack : undefined,
  });

  const response: ApiResponse = {
    success: false,
    error: statusCode >= 500 ? 'Internal server error' : message,
    message: env.isDevelopment ? message : undefined,
  };

  res.status(statusCode).json(response);
}
