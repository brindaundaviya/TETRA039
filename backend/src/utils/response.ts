import type { Response } from 'express';
import type { ApiResponse } from '../types/index.js';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): Response {
  const responsePayload: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(responsePayload);
}

export function sendCreated<T>(
  res: Response,
  data: T,
  message = 'Resource created successfully'
): Response {
  return sendSuccess(res, data, message, 201);
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  errorDetails?: string | null,
  stack?: string
): Response {
  const responsePayload: ApiResponse = {
    success: false,
    message,
    error: errorDetails ?? message,
    ...(stack ? { stack } : {}),
  };
  return res.status(statusCode).json(responsePayload);
}
