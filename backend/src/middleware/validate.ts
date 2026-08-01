import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';

export type ValidationRule = (req: Request) => string | null;

export function validateRequest(rules: ValidationRule[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    for (const rule of rules) {
      const error = rule(req);
      if (error) {
        return next(ApiError.badRequest(error));
      }
    }
    next();
  };
}

export const commonRules = {
  requireBodyField: (field: string) => (req: Request): string | null => {
    if (!req.body || req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
      return `Field '${field}' is required in request body`;
    }
    return null;
  },

  requireOneOfBodyFields: (fields: string[]) => (req: Request): string | null => {
    if (!req.body) {
      return `Request body is missing. One of [${fields.join(', ')}] is required`;
    }
    const hasAtLeastOne = fields.some(
      (field) => req.body[field] !== undefined && req.body[field] !== null && req.body[field] !== ''
    );
    if (!hasAtLeastOne) {
      return `At least one of [${fields.join(', ')}] is required in request body`;
    }
    return null;
  },
};
