import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export interface PredictionData {
  diseaseName: string;
  scientificName: string;
  cropType: string;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Healthy';
  confidence: number;
  predictionTime: string;
  modelVersion: string;
}

interface PredictionResultCardProps {
  prediction: PredictionData;
}

export function PredictionResultCard({ prediction }: PredictionResultCardProps) {
  const getRiskBadge = (level: PredictionData['riskLevel']) => {
    switch (level) {
      case 'High Risk':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'Medium Risk':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Low Risk':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300';
      case 'Healthy':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    }
  };

  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-6 relative group">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="p-6 pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AI Diagnosis Summary
          </CardTitle>
          <CardDescription>Verified by deep neural network classifier</CardDescription>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-mono border font-semibold ${getRiskBadge(prediction.riskLevel)}`}>
          {prediction.riskLevel}
        </span>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        
        {/* Main Disease Banner */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="text-xs font-mono text-primary-400 uppercase tracking-widest">
            Identified Pathogen Condition
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {prediction.diseaseName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 italic font-mono">
            Taxonomy: {prediction.scientificName}
          </p>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Crop Species
            </span>
            <span className="text-base font-bold text-white block">
              {prediction.cropType}
            </span>
          </div>

          <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Confidence Score
            </span>
            <span className="text-base font-bold text-emerald-400 font-mono block">
              {prediction.confidence}%
            </span>
          </div>

          <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Inference Latency
            </span>
            <span className="text-base font-bold text-accent-300 font-mono block">
              {prediction.predictionTime}
            </span>
          </div>

          <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
              Model Engine
            </span>
            <span className="text-xs font-bold text-slate-200 font-mono block truncate">
              {prediction.modelVersion}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
