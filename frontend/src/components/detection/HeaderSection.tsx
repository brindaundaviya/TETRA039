export function HeaderSection() {
  return (
    <div className="relative glass-card p-6 sm:p-8 rounded-3xl border border-white/10 overflow-hidden mb-8 group">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full glass border border-primary-500/30 text-xs font-mono text-primary-300 shadow-glow">
              Simple field scan
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>🌿</span> Check crop disease in <span className="gradient-text">minutes</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Take a photo of a leaf and get a clear result with the likely disease, severity, and what to do next.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl glass border border-white/10 text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Ready to scan</span>
        </div>

      </div>
    </div>
  );
}
