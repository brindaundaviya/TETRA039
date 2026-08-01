export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | null;
  stack?: string;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  uptime: number;
  environment: string;
  memoryUsage: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
}

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// Domain Model Interfaces (Prepared for Future Business Logic / AI Integration)

export interface Crop {
  id: string;
  name: string;
  scientificName?: string;
  category: string;
  description?: string;
}

export interface Disease {
  id: string;
  cropId: string;
  name: string;
  symptoms: string[];
  preventiveMeasures: string[];
  treatment?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface PredictionRequest {
  cropId?: string;
  imageUrl?: string;
  imageBase64?: string;
}

export interface PredictionResult {
  id: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  timestamp: string;
}

export interface HistoryItem {
  id: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  imageUrl?: string;
  createdAt: string;
}
