import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import type { ApiResponse, HealthCheckResponse } from '../types/index.js';

export function getHealth(_req: Request, res: Response): void {
  const health: HealthCheckResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.nodeEnv,
  };

  const response: ApiResponse<HealthCheckResponse> = {
    success: true,
    data: health,
    message: 'Service is healthy',
  };

  res.status(200).json(response);
}
