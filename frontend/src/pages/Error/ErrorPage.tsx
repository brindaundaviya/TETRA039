import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorPage({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-8">
      <div className="glass-card p-8 sm:p-12 max-w-md text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-slate-400">{message}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <Button variant="outline" onClick={onRetry} fullWidth>
              Try Again
            </Button>
          )}
          <Link to={ROUTES.LANDING}>
            <Button fullWidth>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
