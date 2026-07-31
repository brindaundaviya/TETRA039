import { env } from '../config/env.js';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const LOG_COLORS: Record<LogLevel, string> = {
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[35m',
};

const RESET = '\x1b[0m';

function formatMessage(level: LogLevel, message: string, meta?: unknown): string {
  const timestamp = new Date().toISOString();
  const prefix = `${LOG_COLORS[level]}[${level.toUpperCase()}]${RESET}`;
  const metaStr = meta !== undefined ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} ${prefix} ${message}${metaStr}`;
}

export const logger = {
  info(message: string, meta?: unknown): void {
    console.log(formatMessage('info', message, meta));
  },

  warn(message: string, meta?: unknown): void {
    console.warn(formatMessage('warn', message, meta));
  },

  error(message: string, meta?: unknown): void {
    console.error(formatMessage('error', message, meta));
  },

  debug(message: string, meta?: unknown): void {
    if (env.isDevelopment) {
      console.debug(formatMessage('debug', message, meta));
    }
  },
};
