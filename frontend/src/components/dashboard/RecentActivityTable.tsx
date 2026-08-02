import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface DetectionItem {
  id: string;
  crop: string;
  disease: string;
  confidence: number;
  status: 'Action Needed' | 'Healthy' | 'Monitor';
  timestamp: string;
  accent: string;
  imageLabel: string;
}

const RECENT_SCANS: DetectionItem[] = [
  {
    id: 'scan-1092',
    crop: 'Tomato',
    disease: 'Early Blight',
    confidence: 99.4,
    status: 'Action Needed',
    timestamp: '12 mins ago',
    accent: 'border-red-500/30 bg-red-500/10 text-red-300',
    imageLabel: 'Leaf scan',
  },
  {
    id: 'scan-1091',
    crop: 'Potato',
    disease: 'Healthy Leaf',
    confidence: 98.9,
    status: 'Healthy',
    timestamp: '45 mins ago',
    accent: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    imageLabel: 'Healthy sample',
  },
  {
    id: 'scan-1090',
    crop: 'Rice',
    disease: 'Leaf Blight',
    confidence: 97.2,
    status: 'Action Needed',
    timestamp: '2 hours ago',
    accent: 'border-red-500/30 bg-red-500/10 text-red-300',
    imageLabel: 'Field sample',
  },
  {
    id: 'scan-1089',
    crop: 'Maize',
    disease: 'Common Rust',
    confidence: 95.8,
    status: 'Monitor',
    timestamp: '3 hours ago',
    accent: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    imageLabel: 'Monitor scan',
  },
];

export function RecentActivityTable() {
  return (
    <Card className="mb-8 overflow-hidden border border-white/10 p-0">
      <CardHeader className="flex flex-col gap-3 border-b border-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Detection History
          </CardTitle>
          <CardDescription>Recent crop checks with clear next steps</CardDescription>
        </div>

        <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm font-medium text-slate-300">
          4 recent checks
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
        {RECENT_SCANS.map((item) => (
          <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-2xl text-primary-300">
                🌿
              </div>
              <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${item.accent}`}>
                {item.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-sm font-semibold text-white">{item.crop}</div>
              <div className="text-sm text-slate-300">{item.disease}</div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Confidence</span>
                <span className="font-semibold text-white">{item.confidence}%</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Date</span>
                <span className="font-semibold text-white">{item.timestamp}</span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
              <div className="font-medium text-white">{item.imageLabel}</div>
              <div className="mt-1 text-xs text-slate-400">Image saved for quick review</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
