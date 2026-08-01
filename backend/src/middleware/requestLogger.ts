import type { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logMeta = {
      requestId: req.id,
      method,
      path: originalUrl,
      status: statusCode,
      duration: `${duration}ms`,
      ip: ip || req.socket.remoteAddress,
    };

    if (statusCode >= 500) {
      logger.error(`[${req.id}] HTTP ${method} ${originalUrl} ${statusCode} - ${duration}ms`, logMeta);
    } else if (statusCode >= 400) {
      logger.warn(`[${req.id}] HTTP ${method} ${originalUrl} ${statusCode} - ${duration}ms`, logMeta);
    } else {
      logger.info(`[${req.id}] HTTP ${method} ${originalUrl} ${statusCode} - ${duration}ms`, logMeta);
    }
  });

  next();
}
