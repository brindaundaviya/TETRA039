import { motion } from 'framer-motion';
import { t } from '@/utils/translations';

interface AnalysisProgressProps {
  progress: number; // 0 to 100
  stage: string; // 'Uploading...' | 'Processing...' | 'Analyzing...' | 'Complete'
}

export function AnalysisProgress({ progress, stage }: AnalysisProgressProps) {
  const displayStage = stage || t('scan.analyzing');

  return (
    <div className="relative mb-6 overflow-hidden rounded-[1.75rem] border border-primary-500/30 bg-slate-900/80 p-6 shadow-glow">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-400">
            <span className="h-3 w-3 rounded-full bg-primary-400 animate-ping" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">{displayStage}</h4>
            <p className="text-sm text-slate-400">{t('scan.analyzingMessage')}</p>
          </div>
        </div>

        <span className="text-xl font-extrabold text-primary-400">{Math.round(progress)}%</span>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full border border-white/10 bg-slate-950/80 p-0.5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-400 to-emerald-400 shadow-glow"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeInOut' }}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[11px] font-semibold text-slate-500">
        <span className={progress >= 25 ? 'text-primary-400' : ''}>1. Upload</span>
        <span className={progress >= 50 ? 'text-primary-400' : ''}>2. Check</span>
        <span className={progress >= 75 ? 'text-primary-400' : ''}>3. Analyze</span>
        <span className={progress >= 100 ? 'text-emerald-400' : ''}>4. Ready</span>
      </div>
    </div>
  );
}
