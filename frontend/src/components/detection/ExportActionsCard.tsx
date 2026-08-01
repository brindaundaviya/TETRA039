import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export function ExportActionsCard() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setToastMessage(`${label} triggered — Diagnostic report saved to local session.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-6 relative">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Export & Action Shortcuts
        </CardTitle>
        <CardDescription>Export diagnosis report or save analysis to farm record</CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {toastMessage}
            </span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-400 hover:text-white font-bold ml-2 focus:outline-none"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Download PDF */}
          <button
            type="button"
            onClick={() => handleAction('Download PDF Report')}
            className="p-4 rounded-2xl glass border border-white/10 hover:border-primary-500/40 hover:bg-primary-500/10 text-left transition-all group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-primary-300 transition-colors">
              Download Report (PDF)
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              Agronomic PDF Export
            </div>
          </button>

          {/* Share Result */}
          <button
            type="button"
            onClick={() => handleAction('Share Diagnosis Link')}
            className="p-4 rounded-2xl glass border border-white/10 hover:border-accent-500/40 hover:bg-accent-500/10 text-left transition-all group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center text-accent-400 mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-accent-300 transition-colors">
              Share Result
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              Copy Agronomist Link
            </div>
          </button>

          {/* Save Prediction */}
          <button
            type="button"
            onClick={() => handleAction('Save Prediction Log')}
            className="p-4 rounded-2xl glass border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-left transition-all group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Save Prediction
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              Bookmark to History
            </div>
          </button>

        </div>
      </CardContent>
    </Card>
  );
}
