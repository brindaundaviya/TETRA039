import { MainLayout } from '@/components/layout';
import {
  WelcomeHeader,
  OverviewCards,
  DashboardCharts,
  RecentActivityTable,
  QuickActionsCard,
  TipsAndAgronomyCard,
  SystemStatusCard,
} from '@/components/dashboard';

export function DashboardPage() {
  return (
    <MainLayout title="Overview Dashboard">
      <div className="space-y-2">
        {/* Section 1: Welcome Header */}
        <WelcomeHeader />

        {/* Section 2: 6 Overview Statistic Cards */}
        <OverviewCards />

        {/* Section 3: Recharts Visualizations */}
        <DashboardCharts />

        {/* Section 4: Recent Detection Activity Table */}
        <RecentActivityTable />

        {/* Sections 5, 6, 7: Quick Actions, Tips & System Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickActionsCard />
          <TipsAndAgronomyCard />
          <SystemStatusCard />
        </div>
      </div>
    </MainLayout>
  );
}
