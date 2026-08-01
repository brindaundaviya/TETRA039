export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  uptime: number;
  environment: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ThemeContextValue {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export interface DetectionRecord {
  id: string;
  cropType: string;
  diseaseName: string;
  confidence: number;
  imageUrl: string;
  timestamp: string;
  status: 'healthy' | 'diseased' | 'pending';
}

export interface DashboardStats {
  totalScans: number;
  diseasesDetected: number;
  healthyCrops: number;
  accuracyRate: number;
}

export interface PredictionPayload {
  crop: string;
  disease: string;
  confidence: number;
  risk: 'High' | 'Medium' | 'Low' | 'Healthy';
  recommendation: string;
  prevention: string[];
  scientificName?: string;
  immediateAction?: string;
  organicSolution?: string;
  chemicalSolution?: string;
  recoveryTime?: string;
  predictionTimeMs?: number;
  modelVersion?: string;
  similarDiseases?: Array<{
    name: string;
    scientificName?: string;
    confidence: number;
    description: string;
    differentiatingFactor?: string;
  }>;
}

export interface PredictApiResponse {
  success: boolean;
  prediction?: PredictionPayload;
  message?: string;
  error?: string;
}

export type DetectionErrorCategory =
  | 'INVALID_FILE'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'PREDICTION_FAILED'
  | 'NO_INTERNET'
  | 'API_TIMEOUT';

export interface DetectionErrorState {
  category: DetectionErrorCategory;
  title: string;
  message: string;
  details?: string;
}

export type RiskLevel = 'High' | 'Medium' | 'Low' | 'Healthy';

export interface HistoryPrediction {
  id: string;
  crop: string;
  disease: string;
  scientificName?: string;
  confidence: number;
  risk: RiskLevel;
  timestamp: string;
  imageUrl: string;
  recommendation: string;
  prevention: string[];
  immediateAction?: string;
  organicSolution?: string;
  chemicalSolution?: string;
  recoveryTime?: string;
  predictionTimeMs?: number;
  modelVersion?: string;
  status?: 'healthy' | 'diseased' | 'pending';
}

export interface HistoryFilterState {
  search: string;
  crop: string;
  disease: string;
  risk: string;
  confidenceRange: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
  dateRange: 'ALL' | 'TODAY' | 'WEEK' | 'MONTH';
  sortBy: 'date_desc' | 'date_asc' | 'confidence_desc' | 'confidence_asc' | 'crop_asc';
}

export interface HistorySummaryStats {
  totalPredictions: number;
  healthyPlants: number;
  diseasedPlants: number;
  averageConfidence: number;
}

