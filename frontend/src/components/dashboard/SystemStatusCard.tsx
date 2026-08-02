import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface ServiceStatus {
  name: string;
  status: 'Connected' | 'Pending' | 'Demo Mode';
  badgeBg: string;
  dotColor: string;
  latency: string;
}

const SERVICES: ServiceStatus[] = [
  {
    name: 'Frontend Application',
    status: 'Connected',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    dotColor: 'bg-emerald-400',
    latency: '12ms',
  },
  {
    name: 'Field Support Service',
    status: 'Connected',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    dotColor: 'bg-emerald-400',
    latency: '45ms',
  },
  {
    name: 'AI Detection System',
    status: 'Connected',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    dotColor: 'bg-emerald-400',
    latency: '180ms GPU',
  },
  {
    name: 'Crop Analysis Service',
    status: 'Demo Mode',
    badgeBg: 'bg-accent-500/10 border-accent-500/30 text-accent-300',
    dotColor: 'bg-accent-400',
    latency: 'Mock Data Active',
  },
];

export function SystemStatusCard() {
  return (
    <Card className="p-0 border border-white/10 overflow-hidden h-full flex flex-col justify-between">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Farm Support Status
          </CardTitle>

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ALL SYSTEMS NORMAL
          </span>
        </div>
        <CardDescription>Daily field support tools and crop guidance readiness</CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-3 flex-1 flex flex-col justify-around">
        {SERVICES.map((service) => (
          <div
            key={service.name}
            className="p-3.5 rounded-2xl glass border border-white/5 flex items-center justify-between hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${service.dotColor} animate-pulse`} />
              <span className="text-sm font-semibold text-white">{service.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                {service.latency}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono border font-medium ${service.badgeBg}`}>
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
