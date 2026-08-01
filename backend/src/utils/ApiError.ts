import type { AppError } from '../types/index.js';

export class ApiError extends Error implements AppError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  public static unauthorized(message = 'Unauthorized access'): ApiError {
    return new ApiError(401, message);
  }

  public static forbidden(message = 'Forbidden access'): ApiError {
    return new ApiError(403, message);
  }

  public static notFound(message = 'Resource not found'): ApiError {
    return new ApiError(404, message);
  }

  public static internal(message = 'Internal server error'): ApiError {
    return new ApiError(500, message, false);
  }

  public static serviceUnavailable(message = 'Service temporarily unavailable'): ApiError {
    return new ApiError(533, message, false);
  }
}
