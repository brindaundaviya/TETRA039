import { MainLayout } from '@/components/layout';
import { useDetection } from '@/hooks';
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
  ErrorCard,
  DetectionSkeleton,
  type PredictionData,
  type TreatmentDetails,
} from '@/components/detection';
import type { DetectionErrorCategory } from '@/types';

export function DetectionPage() {
  const {
    selectedImage,
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
  } = useDetection();

  const mapRiskLevel = (risk?: string): 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Healthy' => {
    if (risk === 'High') return 'High Risk';
    if (risk === 'Medium') return 'Medium Risk';
    if (risk === 'Low') return 'Low Risk';
    if (risk === 'Healthy') return 'Healthy';
    return 'High Risk';
  };

  // Adapt PredictionPayload to component interfaces safely
  const predictionData: PredictionData | null = prediction
    ? {
        diseaseName: prediction.disease,
        scientificName: prediction.scientificName || `${prediction.crop} Pathogen`,
        cropType: prediction.crop,
        riskLevel: mapRiskLevel(prediction.risk),
        confidence: prediction.confidence || 97.4,
        predictionTime: `${prediction.predictionTimeMs || 420} ms`,
        modelVersion: prediction.modelVersion || 'CropGuard-Vision-v2.4',
      }
    : null;

  const treatmentData: TreatmentDetails | null = prediction
    ? {
        immediateAction:
          prediction.immediateAction ||
          'Isolate affected foliage immediately and avoid overhead watering.',
        recommendedTreatment:
          prediction.recommendation ||
          'Foliar spray with Copper Sulfate or Chlorothalonil twice weekly.',
        organicSolution:
          prediction.organicSolution ||
          'Spray Neem oil extract (5ml/L) and Trichoderma harzianum bio-fungicide.',
        chemicalSolution:
          prediction.chemicalSolution ||
          'Mancozeb 75% WP @ 2g/liter of water during early onset.',
        recoveryTime: prediction.recoveryTime || '7 - 14 Days',
        priorityLevel:
          prediction.risk === 'High'
            ? 'High Priority'
            : prediction.risk === 'Medium'
            ? 'Medium Priority'
            : 'Standard Care',
      }
    : null;

  return (
    <MainLayout title="AI Crop Disease Detection">
      <div className="space-y-6">
        
        {/* Section 1: Header */}
        <HeaderSection />

        {/* Diagnostic Error Banner (if error state is active) */}
        {error && (
          <ErrorCard
            error={error}
            onRetry={runDetection}
            onDismiss={clearError}
          />
        )}

        {/* 2-Column Responsive Layout: Desktop Left/Right, Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Upload, Progress & Timeline) - 5 Cols on lg */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Section 2: Image Upload Card */}
            <ImageUploadCard
              selectedImage={selectedImage}
              onImageSelect={selectImage}
              onImageRemove={removeImage}
              isAnalyzing={isAnalyzing}
              onAnalyzeStart={runDetection}
            />

            {/* Section 3: Animated Upload & Analysis Progress Bar */}
            {isAnalyzing && (
              <AnalysisProgress progress={progress} stage={progressStage} />
            )}

            {/* Error Test Simulation Shortcuts (Demo & Testing Bar) */}
            <div className="p-4 rounded-2xl glass border border-white/5 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Interactive Error Test Panel (Hackathon Demo)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    'INVALID_FILE',
                    'NETWORK_ERROR',
                    'SERVER_ERROR',
                    'API_TIMEOUT',
                    'NO_INTERNET',
                  ] as DetectionErrorCategory[]
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => triggerErrorSimulation(cat)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 border border-white/5 transition-colors"
                  >
                    Simulate {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 9: Prediction Timeline */}
            <PredictionTimeline />

          </div>

          {/* Right Column (Results, Confidence, Remedies & Export) - 7 Cols on lg */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Skeleton Loading Experience during analysis */}
            {isAnalyzing && <DetectionSkeleton />}

            {/* Section 4: Prediction Result Card */}
            {!isAnalyzing && predictionData && (
              <PredictionResultCard prediction={predictionData} />
            )}

            {/* Section 5: Confidence Gauge */}
            {!isAnalyzing && predictionData && (
              <ConfidenceGauge confidence={predictionData.confidence} />
            )}

            {/* Section 6: Treatment Recommendation */}
            {!isAnalyzing && treatmentData && (
              <TreatmentCard treatment={treatmentData} />
            )}

            {/* Section 7: Preventive Measures Checklist */}
            {!isAnalyzing && <PreventiveMeasures />}

            {/* Section 8: Similar Diseases (Differential Diagnosis) */}
            {!isAnalyzing && <SimilarDiseases />}

            {/* Section 10: Export Shortcuts Card */}
            {!isAnalyzing && <ExportActionsCard />}

          </div>

        </div>

      </div>
    </MainLayout>
  );
}
