import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import {
  HeaderSection,
  ImageUploadCard,
  AnalysisProgress,
  PredictionResultCard,
  ConfidenceGauge,
  TreatmentCard,
  PreventiveMeasures,
  SimilarDiseases,
  PredictionTimeline,
  ExportActionsCard,
  type PredictionData,
  type TreatmentDetails,
} from '@/components/detection';

const MOCK_PAYLOADS: Record<string, { prediction: PredictionData; treatment: TreatmentDetails }> = {
  'tomato-early-blight': {
    prediction: {
      diseaseName: 'Tomato Early Blight (Alternaria solani)',
      scientificName: 'Alternaria solani',
      cropType: 'Tomato',
      riskLevel: 'High Risk',
      confidence: 97.4,
      predictionTime: '420 ms',
      modelVersion: 'CropGuard-Vision-v2.4',
    },
    treatment: {
      immediateAction: 'Isolate affected foliage and apply copper hydroxide spray within 24-48 hours.',
      recommendedTreatment: 'Foliar spray with Copper Sulfate or Chlorothalonil twice weekly until lesion growth halts.',
      organicSolution: 'Spray Neem oil extract (5ml/L) and Trichoderma harzianum bio-fungicide to suppress spore spread.',
      chemicalSolution: 'Mancozeb 75% WP @ 2g/liter of water during early onset stage.',
      recoveryTime: '7 - 14 Days',
      priorityLevel: 'High Priority',
    },
  },
  'potato-late-blight': {
    prediction: {
      diseaseName: 'Potato Late Blight (Phytophthora infestans)',
      scientificName: 'Phytophthora infestans',
      cropType: 'Potato',
      riskLevel: 'High Risk',
      confidence: 98.9,
      predictionTime: '380 ms',
      modelVersion: 'CropGuard-Vision-v2.4',
    },
    treatment: {
      immediateAction: 'Prune infected vines immediately and avoid overhead irrigation to curb moisture.',
      recommendedTreatment: 'Apply systemic fungicide containing Cymoxanil or Dimethomorph immediately.',
      organicSolution: 'Apply bio-fungicide Bacillus subtilis and improve field soil drainage.',
      chemicalSolution: 'Metalaxyl-M + Mancozeb mixture applied @ 2.5g/L water.',
      recoveryTime: '10 - 21 Days',
      priorityLevel: 'High Priority',
    },
  },
  'rice-healthy': {
    prediction: {
      diseaseName: 'Healthy Rice Leaf Foliage',
      scientificName: 'Oryza sativa (Pathogen Free)',
      cropType: 'Rice',
      riskLevel: 'Healthy',
      confidence: 99.2,
      predictionTime: '290 ms',
      modelVersion: 'CropGuard-Vision-v2.4',
    },
    treatment: {
      immediateAction: 'No immediate curative treatment needed. Continue normal field monitoring.',
      recommendedTreatment: 'Maintain balanced NPK nitrogen-potassium nutrient scheduling.',
      organicSolution: 'Apply organic compost extract to fortify cellular cell walls.',
      chemicalSolution: 'None required. Keep preventive bio-booster on standby.',
      recoveryTime: 'Optimal Health',
      priorityLevel: 'Standard Care',
    },
  },
};

export function DetectionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    MOCK_PAYLOADS['tomato-early-blight'] ? 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?w=600&auto=format&fit=crop&q=80' : null
  );
  const [activePayloadKey, setActivePayloadKey] = useState<string>('tomato-early-blight');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('Uploading...');

  const activePayload = MOCK_PAYLOADS[activePayloadKey] || MOCK_PAYLOADS['tomato-early-blight'];

  const handleImageSelect = (imageUrl: string, presetId?: string) => {
    setSelectedImage(imageUrl);
    const key = presetId || 'tomato-early-blight';
    setActivePayloadKey(key);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setProgressStage('Uploading...');

    // Simulated progress timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }

        const next = prev + 25;
        if (next >= 75) {
          setProgressStage('Analyzing Cellular Features...');
        } else if (next >= 50) {
          setProgressStage('Processing Image Matrix...');
        } else if (next >= 25) {
          setProgressStage('Uploading to GPU Pipeline...');
        }
        return next;
      });
    }, 350);
  };

  return (
    <MainLayout title="AI Crop Disease Detection">
      <div className="space-y-6">
        
        {/* Section 1: Header */}
        <HeaderSection />

        {/* Desktop 2-Column Grid / Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Upload, Progress & Timeline) - 5 Cols on lg */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Section 2: Image Upload Card */}
            <ImageUploadCard
              selectedImage={selectedImage}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              isAnalyzing={isAnalyzing}
              onAnalyzeStart={handleStartAnalysis}
            />

            {/* Section 3: Animated Upload Progress Bar */}
            {isAnalyzing && (
              <AnalysisProgress progress={progress} stage={progressStage} />
            )}

            {/* Section 9: Prediction Timeline */}
            <PredictionTimeline />

          </div>

          {/* Right Column (Results, Confidence, Remedies & Export) - 7 Cols on lg */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section 4: Prediction Result Card */}
            <PredictionResultCard prediction={activePayload.prediction} />

            {/* Section 5: Confidence Visualization */}
            <ConfidenceGauge confidence={activePayload.prediction.confidence} />

            {/* Section 6: Treatment Recommendation */}
            <TreatmentCard treatment={activePayload.treatment} />

            {/* Section 7: Preventive Measures Checklist */}
            <PreventiveMeasures />

            {/* Section 8: Similar Diseases (Differential Diagnosis) */}
            <SimilarDiseases />

            {/* Section 10: Export Shortcuts Card */}
            <ExportActionsCard />

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
