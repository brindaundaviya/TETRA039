import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`[Configuration Error] Missing required environment variable: ${key}`);
  }
  return value;
}

function getEnvNumber(key: string, fallback: number): number {
  const rawValue = process.env[key];
  if (!rawValue) return fallback;
  const parsed = parseInt(rawValue, 10);
  if (isNaN(parsed) || parsed <= 0) {
    throw new Error(`[Configuration Error] Environment variable ${key} must be a positive integer`);
  }
  return parsed;
}

const nodeEnv = getEnv('NODE_ENV', 'development');

export const env = {
  port: getEnvNumber('PORT', 5000),
  nodeEnv,
  corsOrigin: getEnv('CORS_ORIGIN', 'http://localhost:5173'),
  apiVersion: getEnv('API_VERSION', 'v1'),
  aiProvider: getEnv('AI_PROVIDER', 'mock'),
  aiServiceUrl: getEnv('AI_SERVICE_URL', 'http://localhost:8000/predict'),
  aiTimeoutMs: getEnvNumber('AI_TIMEOUT_MS', 10000),
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
} as const;

export type Env = typeof env;
