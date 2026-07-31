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
