import { MainLayout } from '@/components/layout';
import {
  WelcomeHeader,
  DashboardCharts,
  RecentActivityTable,
  QuickActionsCard,
  TodayWeatherCard,
  TodayAdviceCard,
  HighPriorityAlertCard,
} from '@/components/dashboard';

export function DashboardPage() {
  return (
    <MainLayout title="Farm Dashboard">
      <div className="space-y-6">
        <WelcomeHeader />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <QuickActionsCard />
          <HighPriorityAlertCard />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <TodayWeatherCard />
          <TodayAdviceCard />
          <div className="xl:col-span-1">
            <DashboardCharts />
          </div>
        </div>

        <RecentActivityTable />
      </div>
    </MainLayout>
  );
}
