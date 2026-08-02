import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, ThemeProvider } from '@/context';
import { ErrorBoundary, Loading } from '@/components/common';
import { ROUTES } from '@/utils/constants';

// Lazy-loaded routes for performance code-splitting
const LandingPage = lazy(() =>
  import('@/pages/Landing').then((m) => ({ default: m.LandingPage }))
);
const DashboardPage = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.DashboardPage }))
);
const DetectionPage = lazy(() =>
  import('@/pages/Detection').then((m) => ({ default: m.DetectionPage }))
);
const HistoryPage = lazy(() =>
  import('@/pages/History').then((m) => ({ default: m.HistoryPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage }))
);

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<Loading fullScreen message="Loading CropGuard AI..." />}>
            <Routes>
              <Route path={ROUTES.LANDING} element={<LandingPage />} />
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.DETECTION} element={<DetectionPage />} />
              <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  );
}
