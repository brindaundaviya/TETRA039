import { Card, CardContent } from '@/components/ui';
import type { HistorySummaryStats } from '@/types';
import { formatPercentage } from '@/utils/helpers';

interface SummaryCardsProps {
  stats: HistorySummaryStats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const healthyPct =
    stats.totalPredictions > 0
      ? (stats.healthyPlants / stats.totalPredictions) * 100
      : 0;

  const diseasedPct =
    stats.totalPredictions > 0
      ? (stats.diseasedPlants / stats.totalPredictions) * 100
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Total Predictions */}
      <Card className="relative overflow-hidden bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg hover:border-primary-500/30 transition-all duration-300">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Predictions
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-primary-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {stats.totalPredictions}
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
              LocalStorage DB
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Recorded AI classifications</p>
        </CardContent>
      </Card>

      {/* Card 2: Healthy Plants */}
      <Card className="relative overflow-hidden bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg hover:border-emerald-500/30 transition-all duration-300">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Healthy Plants
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {stats.healthyPlants}
            </div>
            <span className="text-xs font-medium text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {healthyPct.toFixed(0)}% of total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Pathogen-free crop foliage</p>
        </CardContent>
      </Card>

      {/* Card 3: Diseased Plants */}
      <Card className="relative overflow-hidden bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-500/30 transition-all duration-300">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Diseased Plants
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-amber-400 tracking-tight">
              {stats.diseasedPlants}
            </div>
            <span className="text-xs font-medium text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              {diseasedPct.toFixed(0)}% of total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Requires agronomic treatment</p>
        </CardContent>
      </Card>

      {/* Card 4: Average Confidence */}
      <Card className="relative overflow-hidden bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg hover:border-secondary-500/30 transition-all duration-300">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Avg. Confidence
            </span>
            <div className="w-9 h-9 rounded-xl bg-secondary-500/15 border border-secondary-500/30 flex items-center justify-center text-secondary-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-secondary-400 tracking-tight">
              {formatPercentage(stats.averageConfidence)}
            </div>
            <span className="text-xs font-medium text-secondary-300 bg-secondary-500/10 px-2 py-0.5 rounded-md border border-secondary-500/20">
              Vision AI Accuracy
            </span>
          </div>
          {/* Visual Mini Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, stats.averageConfidence))}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
