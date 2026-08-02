import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

const TIMELINE_STEPS = [
  {
    step: '1',
    title: 'Photo received',
    time: 'Step 1',
    description: 'The leaf photo is checked for a clear view and good lighting.',
    status: 'Done',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    step: '2',
    title: 'Leaf pattern reviewed',
    time: 'Step 2',
    description: 'The image is reviewed for spots, color changes, and damaged areas.',
    status: 'Done',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    step: '3',
    title: 'Possible disease matched',
    time: 'Step 3',
    description: 'The scan looks for the disease that best matches the symptoms.',
    status: 'Done',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    step: '4',
    title: 'Severity checked',
    time: 'Step 4',
    description: 'The condition is grouped as low, medium, or high risk to guide action.',
    status: 'Done',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    step: '5',
    title: 'Advice prepared',
    time: 'Step 5',
    description: 'The app prepares simple steps for treatment and follow-up.',
    status: 'Done',
    iconBg: 'bg-primary-500/20 text-primary-400',
  },
];

export function PredictionTimeline() {
  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-6">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          What happened in this scan
        </CardTitle>
        <CardDescription>A simple summary of the check behind the advice.</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-primary-500/80 before:via-emerald-500/50 before:to-emerald-500/20">
          {TIMELINE_STEPS.map((stepItem) => (
            <div key={stepItem.step} className="relative flex items-start justify-between gap-4 group">
              
              {/* Step Circle Marker */}
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-slate-900 border border-primary-500/50 flex items-center justify-center text-xs font-mono font-bold text-primary-400 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-primary-400" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-primary-300 transition-colors">
                    {stepItem.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-slate-400 border border-white/5">
                    {stepItem.time}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 font-bold hidden sm:inline-block">
                {stepItem.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
