import { apiGet } from './api';
import { API_ENDPOINTS } from '@/utils/constants';
import type { HealthCheckResponse } from '@/types';

export async function checkHealth(): Promise<HealthCheckResponse> {
  const response = await apiGet<HealthCheckResponse>(API_ENDPOINTS.HEALTH);
  if (!response.data) {
    throw new Error('Health check failed');
  }
  return response.data;
}
