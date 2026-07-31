import dotenv from 'dotenv';

dotenv.config();

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  port: parseInt(requireEnv('PORT', '5000'), 10),
  nodeEnv: requireEnv('NODE_ENV', 'development'),
  corsOrigin: requireEnv('CORS_ORIGIN', 'http://localhost:5173'),
  isDevelopment: (process.env.NODE_ENV ?? 'development') === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;
