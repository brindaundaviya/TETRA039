import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export interface TreatmentDetails {
  immediateAction: string;
  recommendedTreatment: string;
  organicSolution: string;
  chemicalSolution: string;
  recoveryTime: string;
  priorityLevel: 'High Priority' | 'Medium Priority' | 'Standard Care';
}

interface TreatmentCardProps {
  treatment: TreatmentDetails;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const getPriorityBadge = (priority: TreatmentDetails['priorityLevel']) => {
    switch (priority) {
      case 'High Priority':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'Medium Priority':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Standard Care':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    }
  };

  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-6">
      <CardHeader className="p-6 pb-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Agronomic Treatment Advisory
          </CardTitle>
          <CardDescription>Curated remedies & crop recovery guidelines</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            Est. Recovery: <span className="text-white font-bold">{treatment.recoveryTime}</span>
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-mono border font-semibold ${getPriorityBadge(treatment.priorityLevel)}`}>
            {treatment.priorityLevel}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        
        {/* Immediate Action Banner */}
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Immediate Action Required
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {treatment.immediateAction}
          </p>
        </div>

        {/* Recommended Primary Treatment */}
        <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
          <div className="text-xs font-bold text-primary-400 uppercase tracking-wider">
            Recommended Primary Treatment
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {treatment.recommendedTreatment}
          </p>
        </div>

        {/* Dual Solutions Grid: Organic vs Chemical */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Organic Solution */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              🌱 Organic / Bio Solution
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {treatment.organicSolution}
            </p>
          </div>

          {/* Chemical Solution */}
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              🧪 Targeted Chemical Spray
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {treatment.chemicalSolution}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
