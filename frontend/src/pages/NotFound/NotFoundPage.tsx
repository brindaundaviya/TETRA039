import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-8">
      <div className="glass-card p-8 sm:p-12 max-w-md text-center space-y-6">
        <div className="text-7xl font-bold gradient-text">404</div>
        <h1 className="text-2xl font-semibold text-white">Page Not Found</h1>
        <p className="text-sm text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={ROUTES.LANDING}>
            <Button variant="outline" fullWidth>Go Home</Button>
          </Link>
          <Link to={ROUTES.DASHBOARD}>
            <Button fullWidth>Open Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
