import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export function TipsAndAgronomyCard() {
  return (
    <Card className="p-0 border border-white/10 overflow-hidden h-full flex flex-col justify-between">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Daily Agronomy Advisory
        </CardTitle>
        <CardDescription>Weather insights & seasonal crop protection guidance</CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        
        {/* Weather Placeholder Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-transparent border border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 00-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white">28°C · Particulate Humidity: 64%</div>
              <div className="text-xs text-sky-300">Favorable conditions for foliar spray application</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/30 hidden sm:inline-block">
            OPTIMAL
          </span>
        </div>

        {/* Daily Farming Tip */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Daily Farming Tip
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Early morning drip irrigation minimizes leaf surface moisture duration, reducing fungal spore germination for Early Blight by up to <strong>40%</strong>.
          </p>
        </div>

        {/* Plant Care Reminder */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">Scheduled Inspection Reminder</div>
            <p className="text-xs text-slate-300 mt-0.5">
              Inspect Rice field sector B for potential Brown Spot lesions following recent humidity spikes.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
