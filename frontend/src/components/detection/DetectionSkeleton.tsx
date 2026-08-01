export function DetectionSkeleton() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="w-48 h-6 rounded-lg bg-white/10" />
          <div className="w-32 h-4 rounded-md bg-white/5" />
        </div>
        <div className="w-24 h-7 rounded-full bg-white/10" />
      </div>

      {/* Main Banner Skeleton */}
      <div className="h-28 rounded-2xl bg-white/5 p-4 space-y-3">
        <div className="w-24 h-3 rounded bg-white/10" />
        <div className="w-3/4 h-8 rounded-lg bg-white/10" />
        <div className="w-40 h-3 rounded bg-white/5" />
      </div>

      {/* Metadata Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-white/5 p-4 space-y-2">
            <div className="w-16 h-3 rounded bg-white/10" />
            <div className="w-20 h-5 rounded bg-white/10" />
          </div>
        ))}
      </div>

      {/* Treatment Box Skeleton */}
      <div className="h-32 rounded-2xl bg-white/5 p-4 space-y-3">
        <div className="w-40 h-4 rounded bg-white/10" />
        <div className="w-full h-4 rounded bg-white/5" />
        <div className="w-5/6 h-4 rounded bg-white/5" />
      </div>
    </div>
  );
}
