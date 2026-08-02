import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

const weatherMetrics = [
  { label: 'Temperature', value: '28°C', icon: '☀️' },
  { label: 'Humidity', value: '64%', icon: '💧' },
  { label: 'Rain Probability', value: '25%', icon: '🌧' },
  { label: 'Wind', value: '12 km/h', icon: '💨' },
];

export function TodayWeatherCard() {
  return (
    <Card className="overflow-hidden border border-sky-500/20 bg-gradient-to-br from-sky-500/15 via-slate-900/70 to-emerald-500/10 p-0">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-2xl">
            ☀️
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-white">Today&apos;s Weather</CardTitle>
            <CardDescription>Simple field conditions for the day ahead</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6 pt-2">
        <div className="grid grid-cols-2 gap-3">
          {weatherMetrics.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
              <div className="text-xl">{item.icon}</div>
              <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
              <p className="text-xs text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-sm font-semibold text-emerald-200">Recommended spraying time</p>
          <p className="mt-1 text-base font-bold text-white">Early morning, 6:30–8:30</p>
          <p className="mt-1 text-sm text-emerald-100/80">Low wind and dry leaves make this a good window.</p>
        </div>
      </CardContent>
    </Card>
  );
}
