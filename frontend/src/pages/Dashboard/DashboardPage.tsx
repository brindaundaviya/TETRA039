import { MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { SkeletonDashboard } from '@/components/common';

const placeholderStats = [
  { label: 'Total Scans', value: '—', change: 'Coming soon' },
  { label: 'Diseases Detected', value: '—', change: 'Coming soon' },
  { label: 'Healthy Crops', value: '—', change: 'Coming soon' },
  { label: 'Accuracy Rate', value: '—', change: 'Coming soon' },
];

export function DashboardPage() {
  return (
    <MainLayout title="Dashboard">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your crop health monitoring activity"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {placeholderStats.map((stat) => (
          <Card key={stat.label} hover>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl mt-2">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest crop scan results will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <SkeletonDashboard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Trends</CardTitle>
            <CardDescription>Analytics chart will be rendered here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
              <p className="text-sm text-slate-500">Chart placeholder — Recharts integration ready</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
