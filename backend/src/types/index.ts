export interface ApiErrorDetails {
  code: string;
  details?: unknown;
  field?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiErrorDetails | string | null;
  requestId?: string;
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
  code?: string;
  details?: unknown;
}

// Domain Model Interfaces

export interface Crop {
  id: string;
  name: string;
  scientificName?: string;
  category: string;
  description?: string;
}

export interface DetailedDiseaseInfo {
  id: string;
  diseaseName: string;
  cropName: string;
  cause: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  symptoms: string[];
  immediateAction: string;
  treatment: string;
  organicAlternative: string;
  prevention: string[];
  recoveryTime: string;
}

export interface RecommendationRequestPayload {
  crop: string;
  disease: string;
}

export interface RecommendationResponseData {
  crop: string;
  disease: string;
  severity: string;
  cause: string;
  symptoms: string[];
  immediateAction: string;
  treatment: string;
  organicAlternative: string;
  prevention: string[];
  recoveryTime: string;
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
      id?: string;
      file?: UploadedFile;
    }
  }
}
