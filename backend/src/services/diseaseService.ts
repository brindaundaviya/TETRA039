import type { Disease } from '../types/index.js';

export class DiseaseService {
  /**
   * Prepared placeholder service method to retrieve plant disease catalogue.
   * Business logic and database/AI integration to be added in future iterations.
   */
  public async getDiseases(): Promise<Disease[]> {
    return [
      {
        id: 'dis_tomato_early_blight',
        cropId: 'crop_tomato',
        name: 'Tomato Early Blight',
        symptoms: ['Concentric dark spots on leaves', 'Yellowing foliage', 'Stem lesions'],
        preventiveMeasures: ['Crop rotation', 'Fungicidal treatment', 'Drip irrigation'],
        treatment: 'Apply copper-based fungicide at initial onset.',
        severity: 'medium',
      },
      {
        id: 'dis_potato_late_blight',
        cropId: 'crop_potato',
        name: 'Potato Late Blight',
        symptoms: ['Dark water-soaked spots on leaves', 'White fungal growth under leaf', 'Tuber rot'],
        preventiveMeasures: ['Use certified disease-free seed potatoes', 'Avoid overhead watering'],
        treatment: 'Destroy infected plants and apply systemic fungicide.',
        severity: 'critical',
      },
    ];
  }
}

export const diseaseService = new DiseaseService();
