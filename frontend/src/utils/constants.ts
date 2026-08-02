export const APP_NAME = 'CropGuard';
export const APP_TAGLINE = 'AI-Powered Early Crop Disease Detection';

export const ROUTES = {
  LANDING: '/',
  DASHBOARD: '/dashboard',
  DETECTION: '/detection',
  HISTORY: '/history',
} as const;

export const API_ENDPOINTS = {
  HEALTH: '/health',
} as const;

export const STORAGE_KEYS = {
  THEME: 'cropguard_theme',
  DETECTION_HISTORY: 'cropguard_detection_history',
} as const;
