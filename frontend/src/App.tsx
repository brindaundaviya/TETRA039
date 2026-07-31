import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context';
import { ErrorBoundary } from '@/components/common';
import { Loading } from '@/components/common';
import { ROUTES } from '@/utils/constants';
import { LandingPage } from '@/pages/Landing';
import { DashboardPage } from '@/pages/Dashboard';
import { DetectionPage } from '@/pages/Detection';
import { HistoryPage } from '@/pages/History';
import { AboutPage } from '@/pages/About';
import { NotFoundPage } from '@/pages/NotFound';

export function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<Loading fullScreen message="Loading application..." />}>
            <Routes>
              <Route path={ROUTES.LANDING} element={<LandingPage />} />
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.DETECTION} element={<DetectionPage />} />
              <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
              <Route path={ROUTES.ABOUT} element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
