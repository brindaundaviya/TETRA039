import { motion } from 'framer-motion';

interface AnalysisProgressProps {
  progress: number; // 0 to 100
  stage: string; // 'Uploading...' | 'Processing...' | 'Analyzing...' | 'Complete'
}

export function AnalysisProgress({ progress, stage }: AnalysisProgressProps) {
  return (
    <div className="glass-card p-6 rounded-3xl border border-primary-500/30 shadow-glow mb-6 space-y-4 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-ping" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">{stage}</h4>
            <p className="text-xs text-slate-400 font-mono">Neural Vision Pipeline Active</p>
          </div>
        </div>

        <span className="text-xl font-extrabold font-mono text-primary-400">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-white/10">
        <motion.div
          className="h-full bg-gradient-primary rounded-full shadow-glow"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeInOut' }}
        />
      </div>

      {/* Stage Indicators */}
      <div className="grid grid-cols-4 gap-2 pt-1 text-[11px] font-mono text-center">
        <span className={progress >= 25 ? 'text-primary-400 font-bold' : 'text-slate-500'}>
          1. Uploading
        </span>
        <span className={progress >= 50 ? 'text-primary-400 font-bold' : 'text-slate-500'}>
          2. Processing
        </span>
        <span className={progress >= 75 ? 'text-primary-400 font-bold' : 'text-slate-500'}>
          3. Analyzing
        </span>
        <span className={progress >= 100 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
          4. Complete
        </span>
      </div>

    </div>
  );
}
