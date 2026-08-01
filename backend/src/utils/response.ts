import type { Response } from 'express';
import type { ApiErrorDetails, ApiResponse } from '../types/index.js';

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
    requestId: res.req?.id,
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
  errorDetails?: ApiErrorDetails | string | null,
  stack?: string
): Response {
  let formattedError: ApiErrorDetails | string;

  if (typeof errorDetails === 'object' && errorDetails !== null) {
    formattedError = errorDetails;
  } else {
    const defaultCode =
      statusCode === 404
        ? 'NOT_FOUND'
        : statusCode === 400
        ? 'BAD_REQUEST'
        : statusCode === 401
        ? 'UNAUTHORIZED'
        : statusCode === 403
        ? 'FORBIDDEN'
        : statusCode === 504
        ? 'GATEWAY_TIMEOUT'
        : statusCode === 503
        ? 'SERVICE_UNAVAILABLE'
        : 'INTERNAL_ERROR';

    formattedError = {
      code: defaultCode,
      details: typeof errorDetails === 'string' ? errorDetails : message,
    };
  }

  const responsePayload: ApiResponse = {
    success: false,
    message,
    error: formattedError,
    requestId: res.req?.id,
    ...(stack ? { stack } : {}),
  };

  return res.status(statusCode).json(responsePayload);
}
