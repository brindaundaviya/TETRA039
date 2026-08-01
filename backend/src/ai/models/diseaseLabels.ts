import type { CropDiseaseClassInfo } from '../interfaces/aiEngine.interface.js';

/**
 * PlantVillage dataset pre-trained crop leaf disease labels & metadata.
 * Map model logit/softmax output vector index to Crop & Disease info.
 */
export const CROP_DISEASE_LABELS: Record<number, CropDiseaseClassInfo> = {
  0: { id: 0, crop: 'Tomato', disease: 'Early Blight', fullName: 'Tomato - Early Blight', isHealthy: false },
  1: { id: 1, crop: 'Tomato', disease: 'Late Blight', fullName: 'Tomato - Late Blight', isHealthy: false },
  2: { id: 2, crop: 'Tomato', disease: 'Healthy', fullName: 'Tomato - Healthy', isHealthy: true },
  3: { id: 3, crop: 'Tomato', disease: 'Bacterial Spot', fullName: 'Tomato - Bacterial Spot', isHealthy: false },
  4: { id: 4, crop: 'Tomato', disease: 'Leaf Mold', fullName: 'Tomato - Leaf Mold', isHealthy: false },
  5: { id: 5, crop: 'Tomato', disease: 'Septoria Leaf Spot', fullName: 'Tomato - Septoria Leaf Spot', isHealthy: false },
  6: { id: 6, crop: 'Tomato', disease: 'Spider Mites', fullName: 'Tomato - Spider Mites', isHealthy: false },
  7: { id: 7, crop: 'Tomato', disease: 'Target Spot', fullName: 'Tomato - Target Spot', isHealthy: false },
  8: { id: 8, crop: 'Tomato', disease: 'Yellow Leaf Curl Virus', fullName: 'Tomato - Yellow Leaf Curl Virus', isHealthy: false },
  9: { id: 9, crop: 'Tomato', disease: 'Mosaic Virus', fullName: 'Tomato - Mosaic Virus', isHealthy: false },

  10: { id: 10, crop: 'Potato', disease: 'Early Blight', fullName: 'Potato - Early Blight', isHealthy: false },
  11: { id: 11, crop: 'Potato', disease: 'Late Blight', fullName: 'Potato - Late Blight', isHealthy: false },
  12: { id: 12, crop: 'Potato', disease: 'Healthy', fullName: 'Potato - Healthy', isHealthy: true },

  13: { id: 13, crop: 'Corn', disease: 'Common Rust', fullName: 'Corn - Common Rust', isHealthy: false },
  14: { id: 14, crop: 'Corn', disease: 'Cercospora Leaf Spot', fullName: 'Corn - Cercospora Leaf Spot', isHealthy: false },
  15: { id: 15, crop: 'Corn', disease: 'Healthy', fullName: 'Corn - Healthy', isHealthy: true },

  16: { id: 16, crop: 'Apple', disease: 'Apple Scab', fullName: 'Apple - Apple Scab', isHealthy: false },
  17: { id: 17, crop: 'Apple', disease: 'Black Rot', fullName: 'Apple - Black Rot', isHealthy: false },
  18: { id: 18, crop: 'Apple', disease: 'Healthy', fullName: 'Apple - Healthy', isHealthy: true },
};

/**
 * Get disease label info by index safely with fallback.
 */
export function getDiseaseClassInfo(classIndex: number): CropDiseaseClassInfo {
  const info = CROP_DISEASE_LABELS[classIndex];
  if (info) return info;
  return {
    id: classIndex,
    crop: 'Tomato',
    disease: 'Unknown Condition',
    fullName: 'Crop - Unknown Condition',
    isHealthy: false,
  };
}
