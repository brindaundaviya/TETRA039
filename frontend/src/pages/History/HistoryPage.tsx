import { MainLayout } from '@/components/layout';
import { PageHeader, SkeletonTable } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

export function HistoryPage() {
  return (
    <MainLayout title="History">
      <PageHeader
        title="Scan History"
        subtitle="View and manage your previous crop disease detections"
      />

      <Card>
        <CardHeader>
          <CardTitle>Detection Records</CardTitle>
          <CardDescription>
            History will be persisted in localStorage — implementation coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10" />
            <div className="w-full sm:w-40 h-10 rounded-xl bg-white/5 border border-white/10" />
          </div>
          <SkeletonTable rows={6} />
          <p className="text-center text-sm text-slate-500 mt-8 py-8 border border-dashed border-white/10 rounded-xl">
            No detection history yet. Run your first scan to get started.
          </p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
