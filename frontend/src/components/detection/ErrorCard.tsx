import { Button } from '@/components/ui';
import type { DetectionErrorState } from '@/types';

interface ErrorCardProps {
  error: DetectionErrorState;
  onRetry?: () => void;
  onDismiss: () => void;
}

export function ErrorCard({ error, onRetry, onDismiss }: ErrorCardProps) {
  const getCategoryTheme = () => {
    switch (error.category) {
      case 'INVALID_FILE':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: (
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case 'NETWORK_ERROR':
      case 'NO_INTERNET':
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          icon: (
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829M12 12v.01M3 3l18 18" />
            </svg>
          ),
        };
      case 'SERVER_ERROR':
      case 'API_TIMEOUT':
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          icon: (
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      default:
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: (
            <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div className={`p-6 rounded-3xl glass border ${theme.bg} mb-6 relative overflow-hidden transition-all duration-300 animate-in fade-in`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center flex-shrink-0">
          {theme.icon}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white tracking-tight">
              {error.title}
            </h4>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {error.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {error.message}
          </p>

          {error.details && (
            <p className="text-[11px] font-mono text-slate-400 pt-1">
              {error.details}
            </p>
          )}

          <div className="pt-4 flex items-center gap-3">
            {onRetry && (
              <Button size="sm" variant="primary" onClick={onRetry}>
                Retry Analysis
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={onDismiss} className="text-slate-300 hover:text-white">
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
