import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export function HighPriorityAlertCard() {
  return (
    <Card className="overflow-hidden border border-red-500/30 bg-gradient-to-br from-red-500/15 via-slate-900/70 to-amber-500/10 p-0">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 text-2xl">
            ⚠️
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-white">Action needed today</CardTitle>
            <CardDescription>Check your field soon</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6 pt-2">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-red-200">Leaf spot is spreading nearby</p>
          <p className="mt-1 text-base font-bold text-white">Inspect your plants today</p>
          <p className="mt-1 text-sm text-red-100/80">Nearby farms are reporting more leaf spotting. Check the plants early and protect the next rows.</p>
        </div>
      </CardContent>
    </Card>
  );
}
