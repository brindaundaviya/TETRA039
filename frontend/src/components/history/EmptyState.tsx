import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

interface EmptyStateProps {
  onSeedData: () => void;
  isFilteredEmpty?: boolean;
  onResetFilters?: () => void;
}

export function EmptyState({ onSeedData, isFilteredEmpty = false, onResetFilters }: EmptyStateProps) {
  if (isFilteredEmpty) {
    return (
      <div className="py-14 px-6 text-center rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-xl font-bold text-white">No Matching Predictions Found</h3>
          <p className="text-sm text-slate-400">
            No history records matched your current filter criteria or search query.
          </p>
        </div>
        {onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters} className="text-xs">
            Reset Filters ↺
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="py-16 px-6 text-center rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
      {/* Modern SVG Agricultural AI Illustration Graphic */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-primary-500/15 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-24 h-24 rounded-3xl bg-slate-900 border border-primary-500/30 flex items-center justify-center text-primary-400 shadow-glow">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
      </div>

      {/* Messaging */}
      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          Start your first field scan
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Take a clear photo of a leaf to check disease, severity, and what to do next.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to={ROUTES.DETECTION}>
          <Button variant="primary" size="md" className="gap-2 px-6 shadow-glow">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Start a new scan
          </Button>
        </Link>
        <Button variant="outline" size="md" onClick={onSeedData} className="gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Load sample records
        </Button>
      </div>
    </div>
  );
}
