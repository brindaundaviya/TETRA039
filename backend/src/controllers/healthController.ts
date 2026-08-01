import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import type { HealthCheckResponse } from '../types/index.js';
import { sendSuccess } from '../utils/response.js';

export function getHealth(_req: Request, res: Response): void {
  const memory = process.memoryUsage();

  const healthData: HealthCheckResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: env.nodeEnv,
    memoryUsage: {
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memory.heapTotal / 1024 / 1024),
      rss: Math.round(memory.rss / 1024 / 1024),
    },
  };

  sendSuccess(res, healthData, 'Service is healthy');
}
