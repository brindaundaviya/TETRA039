import { DISEASE_KNOWLEDGE_BASE } from '../data/cropKnowledgeBase.js';
import type { DetailedDiseaseInfo } from '../types/index.js';

export class DiseaseService {
  /**
   * Retrieves disease catalog, with optional filter by crop name.
   */
  public async getDiseases(cropQuery?: string): Promise<DetailedDiseaseInfo[]> {
    if (cropQuery && cropQuery.trim()) {
      const normalizedCrop = cropQuery.trim().toLowerCase();
      return DISEASE_KNOWLEDGE_BASE.filter(
        (d) => d.cropName.toLowerCase() === normalizedCrop
      );
    }
    return DISEASE_KNOWLEDGE_BASE;
  }
}

export const diseaseService = new DiseaseService();
