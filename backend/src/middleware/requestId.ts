import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export function requestId(req: Request, res: Response, next: NextFunction): void {
  const existingId = req.headers['x-request-id'];
  const id = typeof existingId === 'string' && existingId.trim() ? existingId.trim() : crypto.randomUUID();

  req.id = id;
  res.setHeader('X-Request-ID', id);

  next();
}
