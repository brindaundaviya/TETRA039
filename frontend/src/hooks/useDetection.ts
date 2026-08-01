import { useState, useCallback } from 'react';
import { predictCropDisease } from '@/services/detectionService';
import type { PredictionPayload, DetectionErrorState, DetectionErrorCategory } from '@/types';

export function useDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?w=600&auto=format&fit=crop&q=80'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropType, setCropType] = useState<string>('Tomato');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('Uploading...');
  const [prediction, setPrediction] = useState<PredictionPayload | null>({
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
  });
  const [error, setError] = useState<DetectionErrorState | null>(null);

  const selectImage = useCallback((fileOrUrl: File | string, cropHint?: string) => {
    setError(null);

    if (cropHint) {
      setCropType(cropHint);
    }

    if (typeof fileOrUrl === 'string') {
      setSelectedImage(fileOrUrl);
      setSelectedFile(null);
      return;
    }

    // Validate file format
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(fileOrUrl.type)) {
      setError({
        category: 'INVALID_FILE',
        title: 'Unsupported Image Format',
        message: 'Please select a valid leaf photo in PNG, JPG, or JPEG format.',
        details: `Selected file type "${fileOrUrl.type || 'unknown'}" is not supported.`,
      });
      return;
    }

    // Validate file size (max 5 MB)
    if (fileOrUrl.size > 5 * 1024 * 1024) {
      setError({
        category: 'INVALID_FILE',
        title: 'File Size Limit Exceeded',
        message: 'The selected image exceeds the maximum 5 MB limit. Please compress or choose a smaller photo.',
        details: `Selected file size is ${(fileOrUrl.size / (1024 * 1024)).toFixed(2)} MB.`,
      });
      return;
    }

    const objectUrl = URL.createObjectURL(fileOrUrl);
    setSelectedImage(objectUrl);
    setSelectedFile(fileOrUrl);
  }, []);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    setSelectedFile(null);
    setPrediction(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const triggerErrorSimulation = useCallback((category: DetectionErrorCategory) => {
    switch (category) {
      case 'INVALID_FILE':
        setError({
          category: 'INVALID_FILE',
          title: 'Invalid Leaf Image',
          message: 'The uploaded file could not be parsed as a valid agricultural leaf sample.',
        });
        break;
      case 'NETWORK_ERROR':
        setError({
          category: 'NETWORK_ERROR',
          title: 'Network Communication Error',
          message: 'Failed to connect to the CropGuard AI prediction service. Please check your network connection.',
        });
        break;
      case 'SERVER_ERROR':
        setError({
          category: 'SERVER_ERROR',
          title: 'Server Error (500)',
          message: 'The prediction gateway encountered an unexpected internal exception.',
        });
        break;
      case 'API_TIMEOUT':
        setError({
          category: 'API_TIMEOUT',
          title: 'Request Timed Out',
          message: 'The AI model inference pipeline took longer than 30 seconds to respond.',
        });
        break;
      case 'NO_INTERNET':
        setError({
          category: 'NO_INTERNET',
          title: 'No Internet Connection',
          message: 'You appear to be offline. Enable mock mode to continue offline testing.',
        });
        break;
      default:
        setError({
          category: 'PREDICTION_FAILED',
          title: 'Prediction Failure',
          message: 'Could not classify crop pathogen with sufficient statistical certainty.',
        });
    }
  }, []);

  const runDetection = useCallback(async () => {
    if (!selectedImage && !selectedFile) {
      setError({
        category: 'INVALID_FILE',
        title: 'No Image Selected',
        message: 'Please upload or select a crop leaf photo before running AI diagnosis.',
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setProgress(0);
    setProgressStage('Uploading...');

    // Progress animation sequence
    const targetPayload = selectedFile || selectedImage || '';

    // Simulate stepped progress during upload / inference
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        const next = prev + 30;
        if (next >= 60) setProgressStage('Analyzing Cellular Features...');
        else if (next >= 30) setProgressStage('Processing Image Matrix...');
        return next;
      });
    }, 200);

    try {
      const response = await predictCropDisease(targetPayload, cropType, (pct) => {
        setProgress(pct);
      });

      clearInterval(interval);
      setProgress(100);
      setProgressStage('Complete');

      if (response.success && response.prediction) {
        setPrediction(response.prediction);
      } else {
        setError({
          category: 'PREDICTION_FAILED',
          title: 'Analysis Unsuccessful',
          message: response.message || 'The AI vision engine could not classify the leaf sample.',
        });
      }
    } catch (err: any) {
      clearInterval(interval);
      setError({
        category: 'NETWORK_ERROR',
        title: 'API Connection Failed',
        message: err.message || 'An error occurred while connecting to the backend prediction API.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage, selectedFile, cropType]);

  return {
    selectedImage,
    selectedFile,
    cropType,
    setCropType,
    isAnalyzing,
    progress,
    progressStage,
    prediction,
    error,
    selectImage,
    removeImage,
    runDetection,
    clearError,
    triggerErrorSimulation,
  };
}
