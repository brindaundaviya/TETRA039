import { SUPPORTED_CROPS } from '../data/cropKnowledgeBase.js';
import type { Crop } from '../types/index.js';

export class CropService {
  /**
   * Retrieves supported crop catalog from the crop knowledge base.
   */
  public async getCrops(): Promise<Crop[]> {
    return SUPPORTED_CROPS;
  }
}

export const cropService = new CropService();
