import { Button } from '@/components/ui';
import type { DetectionErrorState } from '@/types';
import { t } from '@/utils/translations';

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
    <div className={`mb-6 overflow-hidden rounded-[1.75rem] border p-6 ${theme.bg} transition-all duration-300`}>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70">
          {theme.icon}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-lg font-bold text-white">{error.title}</h4>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
              {error.category}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-300">{error.message}</p>

          {error.details && <p className="text-sm text-slate-400">{error.details}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onRetry && (
              <Button size="sm" variant="primary" onClick={onRetry}>
                Try Again
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={onDismiss} className="text-slate-300 hover:text-white">
              {t('scan.seeMore')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
