import type { HistoryItem } from '../types/index.js';

export class HistoryService {
  /**
   * Prepared placeholder service method to retrieve prediction history logs.
   * Business logic and database/AI integration to be added in future iterations.
   */
  public async getHistory(): Promise<HistoryItem[]> {
    return [
      {
        id: 'hist_001',
        cropName: 'Tomato',
        diseaseName: 'Tomato Early Blight',
        confidence: 0.94,
        imageUrl: 'https://example.com/samples/tomato_sample.jpg',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

export const historyService = new HistoryService();
