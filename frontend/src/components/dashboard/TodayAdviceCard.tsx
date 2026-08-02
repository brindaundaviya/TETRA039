import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export function TodayAdviceCard() {
  return (
    <Card className="overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-slate-900/70 to-primary-500/10 p-0">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">
            🌱
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-white">Today&apos;s Farming Advice</CardTitle>
            <CardDescription>Practical steps for healthier crops today</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6 pt-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-white">Daily farming tip</p>
          <p className="mt-1 text-sm text-slate-300">Water early in the morning and keep leaves dry to reduce disease spread.</p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
          <p className="text-sm font-semibold text-amber-200">Disease prevention advice</p>
          <p className="mt-1 text-sm text-amber-100/80">Check the lower leaves first, especially after humid nights.</p>
        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">
          <p className="text-sm font-semibold text-sky-200">Irrigation reminder</p>
          <p className="mt-1 text-sm text-sky-100/80">Avoid overwatering today. The soil is already moist from recent rain.</p>
        </div>
      </CardContent>
    </Card>
  );
}
