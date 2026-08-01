import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface DetectionItem {
  id: string;
  crop: string;
  scientificName: string;
  disease: string;
  confidence: number;
  status: 'Action Required' | 'Healthy' | 'Monitored' | 'Resolved';
  timestamp: string;
  badgeBg: string;
}

const RECENT_SCANS: DetectionItem[] = [
  {
    id: 'scan-1092',
    crop: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    disease: 'Early Blight (Alternaria solani)',
    confidence: 99.4,
    status: 'Action Required',
    timestamp: '12 mins ago',
    badgeBg: 'bg-red-500/10 border-red-500/30 text-red-400',
  },
  {
    id: 'scan-1091',
    crop: 'Potato',
    scientificName: 'Solanum tuberosum',
    disease: 'Healthy Leaf Foliage',
    confidence: 98.9,
    status: 'Healthy',
    timestamp: '45 mins ago',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    id: 'scan-1090',
    crop: 'Rice',
    scientificName: 'Oryza sativa',
    disease: 'Bacterial Leaf Blight',
    confidence: 97.2,
    status: 'Action Required',
    timestamp: '2 hours ago',
    badgeBg: 'bg-red-500/10 border-red-500/30 text-red-400',
  },
  {
    id: 'scan-1089',
    crop: 'Maize',
    scientificName: 'Zea mays',
    disease: 'Common Rust (Puccinia sorghi)',
    confidence: 95.8,
    status: 'Monitored',
    timestamp: '3 hours ago',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  },
  {
    id: 'scan-1088',
    crop: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    disease: 'Healthy Leaf Foliage',
    confidence: 99.1,
    status: 'Healthy',
    timestamp: '5 hours ago',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    id: 'scan-1087',
    crop: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    disease: 'Tomato Leaf Curl Virus',
    confidence: 94.6,
    status: 'Resolved',
    timestamp: 'Yesterday',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  },
];

export function RecentActivityTable() {
  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-8">
      
      {/* Table Header */}
      <CardHeader className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Detection Activity
          </CardTitle>
          <CardDescription>
            Live feed of diagnostic scan predictions across registered crops
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full glass border border-white/10 text-xs font-mono text-slate-300">
            6 Recent Entries
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-6">Leaf Sample</th>
                <th className="py-3.5 px-6">Crop Species</th>
                <th className="py-3.5 px-6">Diagnosed Disease</th>
                <th className="py-3.5 px-6">AI Confidence</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {RECENT_SCANS.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <td className="py-4 px-6">
                    <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-primary-400 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </td>

                  {/* Crop */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-white group-hover:text-primary-300 transition-colors">
                      {item.crop}
                    </div>
                    <div className="text-[10px] text-slate-400 italic">
                      {item.scientificName}
                    </div>
                  </td>

                  {/* Disease */}
                  <td className="py-4 px-6">
                    <span className="font-medium text-slate-200">
                      {item.disease}
                    </span>
                  </td>

                  {/* Confidence Progress Bar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-primary-400 rounded-full"
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-emerald-400">
                        {item.confidence}%
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono border font-medium ${item.badgeBg}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-4 px-6 font-mono text-slate-400">
                    {item.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

    </Card>
  );
}
