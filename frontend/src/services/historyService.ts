import { getFromStorage, setToStorage } from '@/utils/helpers';
import { STORAGE_KEYS } from '@/utils/constants';
import type { HistoryPrediction } from '@/types';

// Mock rich sample dataset for instant hackathon demonstration
export const SAMPLE_PREDICTIONS: HistoryPrediction[] = [
  {
    id: 'pred-1001',
    crop: 'Tomato',
    disease: 'Early Blight',
    scientificName: 'Alternaria solani',
    confidence: 97.4,
    risk: 'High',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?w=600&auto=format&fit=crop&q=80',
    recommendation: 'Isolate affected foliage immediately and apply copper hydroxide fungicide spray twice weekly.',
    immediateAction: 'Prune infected lower leaf foliage and isolate surrounding plants.',
    organicSolution: 'Apply Neem oil extract (5ml/L) and Trichoderma harzianum bio-fungicide.',
    chemicalSolution: 'Mancozeb 75% WP @ 2g/liter of water during early onset.',
    recoveryTime: '7 - 14 Days',
    predictionTimeMs: 420,
    modelVersion: 'CropGuard-Vision-v2.4',
    status: 'diseased',
    prevention: [
      'Avoid overhead watering to minimize leaf wetness duration',
      'Improve canopy ventilation with proper plant spacing',
      'Prune and safely burn infected lower leaf foliage immediately',
      'Rotate crops with non-solanaceous species next growing season',
    ],
  },
  {
    id: 'pred-1002',
    crop: 'Potato',
    disease: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    confidence: 98.9,
    risk: 'High',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    recommendation: 'Destroy severely infected vines immediately and apply protective systemic fungicide.',
    immediateAction: 'Stop overhead irrigation and prune infected lower foliage.',
    organicSolution: 'Apply bio-fungicide Bacillus subtilis and improve field soil drainage.',
    chemicalSolution: 'Metalaxyl-M + Mancozeb mixture applied @ 2.5g/L water.',
    recoveryTime: '10 - 21 Days',
    predictionTimeMs: 380,
    modelVersion: 'CropGuard-Vision-v2.4',
    status: 'diseased',
    prevention: [
      'Use certified disease-free seed tubers',
      'Avoid excess nitrogen fertilizer which causes dense susceptible foliage',
      'Destroy volunteer potato plants and nightshade weeds',
    ],
  },
  {
    id: 'pred-1003',
    crop: 'Rice',
    disease: 'Healthy Leaf Foliage',
    scientificName: 'Oryza sativa (Pathogen Free)',
    confidence: 99.2,
    risk: 'Healthy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1536053464731-0dcf3706037a?w=600&auto=format&fit=crop&q=80',
    recommendation: 'No immediate curative treatment needed. Maintain routine field monitoring.',
    immediateAction: 'No immediate action required. Continue regular water level control.',
    organicSolution: 'Apply organic compost extract to fortify cellular cell walls.',
    chemicalSolution: 'None required. Keep preventive bio-booster on standby.',
    recoveryTime: 'Optimal Health',
    predictionTimeMs: 290,
    modelVersion: 'CropGuard-Vision-v2.4',
    status: 'healthy',
    prevention: [
      'Maintain optimal 5cm water level during tillering phase',
      'Ensure balanced NPK fertilizer application',
      'Remove weed hosts from bunds and water canals',
    ],
  },
  {
    id: 'pred-1004',
    crop: 'Corn',
    disease: 'Northern Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    confidence: 91.5,
    risk: 'Medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // Yesterday
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    recommendation: 'Apply foliar fungicide spray before flowering stage if lesions spread above ear leaves.',
    immediateAction: 'Monitor spread rate and remove severely blighted bottom leaves.',
    organicSolution: 'Spray bio-control agent Trichoderma viride every 10 days.',
    chemicalSolution: 'Azoxystrobin + Difenoconazole @ 1ml/L water.',
    recoveryTime: '14 - 21 Days',
    predictionTimeMs: 410,
    modelVersion: 'CropGuard-Vision-v2.4',
    status: 'diseased',
    prevention: [
      'Plant disease-resistant corn hybrid cultivars',
      'Till crop residue after harvest to accelerate decomposition',
      'Maintain 2-year crop rotation with legumes or soy',
    ],
  },
  {
    id: 'pred-1005',
    crop: 'Grape',
    disease: 'Black Rot',
    scientificName: 'Guignardia bidwellii',
    confidence: 88.6,
    risk: 'Medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(), // 2 days ago
    imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
    recommendation: 'Prune mummified fruit clusters and apply protective copper spray before rain events.',
    immediateAction: 'Remove mummified berries and infected leaf spots.',
    organicSolution: 'Sulfur dust or copper soap application every 7-10 days.',
    chemicalSolution: 'Myclobutanil WP applied according to canopy density.',
    recoveryTime: '14 - 28 Days',
    predictionTimeMs: 360,
    modelVersion: 'CropGuard-Vision-v2.4',
    status: 'diseased',
    prevention: [
      'Prune vines for maximum air exposure and sunlight penetration',
      'Sanitize pruning tools between vine blocks',
    ],
  },
  {
    id: 'pred-1006',
    crop: 'Apple',
    disease: 'Healthy Leaf Canopy',
    scientificName: 'Malus domestica (Pathogen Free)',
    confidence: 96.8,
    risk: 'Healthy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 76).toISOString(), // 3 days ago
    imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop&q=80',
    recommendation: 'Leaf canopy is healthy. Maintain seasonal pruning and nutrient regimen.',
    immediateAction: 'No curative action needed.',
    organicSolution: 'Apply balanced micronutrient foliar spray.',
    chemicalSolution: 'None required.',
    recoveryTime: 'Optimal Health',
    predictionTimeMs: 310,
    modelVersion: 'CropGuard-Vision-v2.4',
    status: 'healthy',
    prevention: [
      'Maintain clean orchard floor to reduce overwintering spore pressure',
      'Conduct routine leaf tissue testing for balanced potassium levels',
    ],
  },
];

/**
 * Service encapsulating LocalStorage persistence and future REST API integration
 */
export const historyService = {
  /**
   * Retrieve all saved prediction records from storage.
   * If local storage is empty, seeds default sample data so the page renders interactively.
   */
  getPredictions(): HistoryPrediction[] {
    const data = getFromStorage<HistoryPrediction[]>(STORAGE_KEYS.DETECTION_HISTORY, []);
    if (!data || data.length === 0) {
      // Auto seed sample data if storage is fresh
      setToStorage(STORAGE_KEYS.DETECTION_HISTORY, SAMPLE_PREDICTIONS);
      return SAMPLE_PREDICTIONS;
    }
    return data;
  },

  /**
   * Save a new prediction record into storage
   */
  savePrediction(
    payload: Omit<HistoryPrediction, 'id' | 'timestamp'> & Partial<Pick<HistoryPrediction, 'id' | 'timestamp'>>
  ): HistoryPrediction {
    const existing = this.getPredictions();
    const newRecord: HistoryPrediction = {
      id: payload.id || `pred-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: payload.timestamp || new Date().toISOString(),
      crop: payload.crop,
      disease: payload.disease,
      scientificName: payload.scientificName || `${payload.crop} Pathogen`,
      confidence: payload.confidence,
      risk: payload.risk,
      imageUrl: payload.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?w=600&auto=format&fit=crop&q=80',
      recommendation: payload.recommendation,
      prevention: payload.prevention || [],
      immediateAction: payload.immediateAction,
      organicSolution: payload.organicSolution,
      chemicalSolution: payload.chemicalSolution,
      recoveryTime: payload.recoveryTime,
      predictionTimeMs: payload.predictionTimeMs || 420,
      modelVersion: payload.modelVersion || 'CropGuard-Vision-v2.4',
      status: payload.risk === 'Healthy' ? 'healthy' : 'diseased',
    };

    const updated = [newRecord, ...existing];
    setToStorage(STORAGE_KEYS.DETECTION_HISTORY, updated);
    return newRecord;
  },

  /**
   * Delete an individual record by ID
   */
  deletePrediction(id: string): HistoryPrediction[] {
    const existing = getFromStorage<HistoryPrediction[]>(STORAGE_KEYS.DETECTION_HISTORY, []);
    const updated = existing.filter((item) => item.id !== id);
    setToStorage(STORAGE_KEYS.DETECTION_HISTORY, updated);
    return updated;
  },

  /**
   * Clear all prediction history
   */
  clearAllHistory(): void {
    setToStorage(STORAGE_KEYS.DETECTION_HISTORY, []);
  },

  /**
   * Re-seed sample data explicitly
   */
  seedSampleData(): HistoryPrediction[] {
    setToStorage(STORAGE_KEYS.DETECTION_HISTORY, SAMPLE_PREDICTIONS);
    return SAMPLE_PREDICTIONS;
  },

  /**
   * Generate downloadable CSV of history records
   */
  exportToCSV(predictions: HistoryPrediction[]): void {
    if (!predictions || predictions.length === 0) return;

    const headers = [
      'Prediction ID',
      'Date & Time',
      'Crop',
      'Disease',
      'Scientific Name',
      'Confidence (%)',
      'Risk Level',
      'Model Version',
      'Recommendation',
    ];

    const rows = predictions.map((p) => [
      `"${p.id}"`,
      `"${new Date(p.timestamp).toLocaleString()}"`,
      `"${p.crop}"`,
      `"${p.disease}"`,
      `"${p.scientificName || ''}"`,
      p.confidence.toFixed(1),
      `"${p.risk}"`,
      `"${p.modelVersion || 'CropGuard-Vision-v2.4'}"`,
      `"${(p.recommendation || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `CropGuard_Prediction_History_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
