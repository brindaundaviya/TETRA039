import apiClient from './api';
import type { PredictApiResponse, PredictionPayload } from '@/types';

// Rich Mock Fallback Datasets for offline or demo environment
const MOCK_PREDICTIONS: Record<string, PredictionPayload> = {
  default: {
    crop: 'Tomato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 97.4,
    risk: 'High',
    recommendation: 'Isolate affected foliage immediately and apply copper hydroxide fungicide spray twice weekly.',
    immediateAction: 'Prune infected lower leaf foliage and isolate surrounding plants.',
    organicSolution: 'Apply Neem oil extract (5ml/L) and Trichoderma harzianum bio-fungicide.',
    chemicalSolution: 'Mancozeb 75% WP @ 2g/liter of water during early onset.',
    recoveryTime: '7 - 14 Days',
    predictionTimeMs: 420,
    modelVersion: 'CropGuard-Vision-v2.4',
    prevention: [
      'Avoid overhead watering to minimize leaf wetness duration',
      'Improve canopy ventilation with proper plant spacing',
      'Prune and safely burn infected lower leaf foliage immediately',
      'Monitor adjacent healthy plants every 48 hours for early spots',
      'Rotate crops with non-solanaceous species next growing season',
    ],
    similarDiseases: [
      {
        name: 'Late Blight',
        scientificName: 'Phytophthora infestans',
        confidence: 2.1,
        description: 'Large water-soaked dark brown spots on leaf margins with white mold growth in high humidity.',
        differentiatingFactor: 'Lesions lack the distinctive concentric rings found in Early Blight.',
      },
      {
        name: 'Bacterial Spot',
        scientificName: 'Xanthomonas vesicatoria',
        confidence: 0.3,
        description: 'Small greasy dark brown spots surrounded by yellow halos.',
        differentiatingFactor: 'Lesions are smaller (1-3mm) and appear greasy.',
      },
      {
        name: 'Septoria Leaf Spot',
        scientificName: 'Septoria lycopersici',
        confidence: 0.2,
        description: 'Tiny circular spots with greyish centers filled with black fruiting bodies.',
        differentiatingFactor: 'Grey centers with dark specks distinguish Septoria.',
      },
    ],
  },
  potato: {
    crop: 'Potato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    confidence: 98.9,
    risk: 'High',
    recommendation: 'Destroy severely infected vines immediately and apply protective systemic fungicide.',
    immediateAction: 'Stop overhead irrigation and prune infected lower foliage.',
    organicSolution: 'Apply bio-fungicide Bacillus subtilis and improve field soil drainage.',
    chemicalSolution: 'Metalaxyl-M + Mancozeb mixture applied @ 2.5g/L water.',
    recoveryTime: '10 - 21 Days',
    predictionTimeMs: 380,
    modelVersion: 'CropGuard-Vision-v2.4',
    prevention: [
      'Use certified disease-free seed tubers',
      'Avoid excess nitrogen fertilizer which causes dense susceptible foliage',
      'Destroy volunteer potato plants and nightshade weeds',
      'Harvest tubers only when vines are completely dead and dry',
    ],
  },
  rice: {
    crop: 'Rice',
    disease: 'Healthy Leaf Foliage',
    scientificName: 'Oryza sativa (Pathogen Free)',
    confidence: 99.2,
    risk: 'Healthy',
    recommendation: 'No immediate curative treatment needed. Maintain routine field monitoring.',
    immediateAction: 'No immediate action required. Continue regular water level control.',
    organicSolution: 'Apply organic compost extract to fortify cellular cell walls.',
    chemicalSolution: 'None required. Keep preventive bio-booster on standby.',
    recoveryTime: 'Optimal Health',
    predictionTimeMs: 290,
    modelVersion: 'CropGuard-Vision-v2.4',
    prevention: [
      'Maintain optimal 5cm water level during tillering phase',
      'Ensure balanced NPK fertilizer application',
      'Remove weed hosts from bunds and water canals',
    ],
  },
};

export async function predictCropDisease(
  fileOrImage: File | string,
  cropType?: string,
  onUploadProgress?: (progressPct: number) => void
): Promise<PredictApiResponse> {
  const isMockMode = import.meta.env.VITE_USE_MOCK_API === 'true';

  // If explicit mock mode flag is set or preset string URL is passed, return mock data directly
  if (isMockMode || typeof fileOrImage === 'string') {
    return simulateMockPrediction(cropType);
  }

  // Live API Attempt via Axios
  try {
    const formData = new FormData();
    formData.append('image', fileOrImage);
    if (cropType) {
      formData.append('crop', cropType);
    }

    const response = await apiClient.post<PredictApiResponse>('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onUploadProgress) {
          const pct = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(pct);
        }
      },
    });

    if (response.data && response.data.prediction) {
      return response.data;
    }

    // Fallback if response structure is incomplete
    return simulateMockPrediction(cropType);
  } catch (error) {
    console.warn('[DetectionService] Backend endpoint unreachable or failed. Falling back to mock dataset.', error);
    // Graceful fallback to mock payload on API failure
    return simulateMockPrediction(cropType);
  }
}

async function simulateMockPrediction(cropType?: string): Promise<PredictApiResponse> {
  // Simulate natural network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const key = cropType?.toLowerCase() || 'default';
  const prediction = MOCK_PREDICTIONS[key] || MOCK_PREDICTIONS.default;

  return {
    success: true,
    prediction,
    message: 'Prediction generated successfully (Mock Engine)',
  };
}
