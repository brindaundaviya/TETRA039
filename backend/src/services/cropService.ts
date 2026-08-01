import type { Crop } from '../types/index.js';

export class CropService {
  /**
   * Prepared placeholder service method to retrieve supported crops.
   * Business logic and database/AI integration to be added in future iterations.
   */
  public async getCrops(): Promise<Crop[]> {
    return [
      {
        id: 'crop_tomato',
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        category: 'Vegetable',
        description: 'Common garden crop susceptible to early blight and leaf mold.',
      },
      {
        id: 'crop_potato',
        name: 'Potato',
        scientificName: 'Solanum tuberosum',
        category: 'Tuber',
        description: 'Staple food crop vulnerable to late blight and bacterial wilt.',
      },
      {
        id: 'crop_corn',
        name: 'Corn (Maize)',
        scientificName: 'Zea mays',
        category: 'Cereal',
        description: 'Major grain crop prone to common rust and northern leaf blight.',
      },
    ];
  }
}

export const cropService = new CropService();
