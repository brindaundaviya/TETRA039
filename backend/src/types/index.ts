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

export interface PredictionRequestPayload {
  uploadId?: string;
  imageUrl?: string;
  imageBase64?: string;
  cropHint?: string;
}

export interface AiPredictionData {
  crop: string;
  disease: string;
  confidence: number;
  risk: string;
  recommendation: string;
  prevention: string[];
  processingTime: string;
}

export interface HistoryItem {
  id: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  imageUrl?: string;
  createdAt: string;
}

// Image Upload Specifications & Types

export interface UploadedFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
  size: number;
}

export interface ImageUploadMetadata {
  uploadId: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
  uploadedAt: string;
  status: 'READY_FOR_PREDICTION';
}

declare global {
  namespace Express {
    interface Request {
      file?: UploadedFile;
    }
  }
}
