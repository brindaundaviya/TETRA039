import { Button } from '@/components/ui';

interface ExportHeaderActionsProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
  onShare: () => void;
  onClearAll: () => void;
  onSeedData: () => void;
  hasRecords: boolean;
}

export function ExportHeaderActions({
  onExportCSV,
  onExportPDF,
  onShare,
  onClearAll,
  onSeedData,
  hasRecords,
}: ExportHeaderActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3.5 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md">
      {/* Left: Storage Mode / Backend Integration Status */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          LocalStorage Active
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline-block">
          Backend API Ready (Fallback mode enabled)
        </span>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Seed Sample Data (if user wants to quickly test samples) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSeedData}
          title="Reload mock dataset into LocalStorage"
          className="text-xs text-slate-300 hover:text-white"
        >
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Samples
        </Button>

        {/* Share Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          disabled={!hasRecords}
          className="text-xs"
        >
          <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Report
        </Button>

        {/* Export CSV Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportCSV}
          disabled={!hasRecords}
          className="text-xs"
        >
          <svg className="w-3.5 h-3.5 mr-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </Button>

        {/* Export PDF Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportPDF}
          disabled={!hasRecords}
          className="text-xs"
        >
          <svg className="w-3.5 h-3.5 mr-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Export PDF
        </Button>

        {/* Clear History Button */}
        {hasRecords && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
