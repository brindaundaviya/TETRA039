import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

// Mock Data 1: Disease Distribution
const diseaseDistributionData = [
  { name: 'Early Blight', value: 120, color: '#ef4444' },
  { name: 'Late Blight', value: 85, color: '#f59e0b' },
  { name: 'Bacterial Spot', value: 68, color: '#3b82f6' },
  { name: 'Leaf Blast', value: 41, color: '#8b5cf6' },
  { name: 'Common Rust', value: 28, color: '#10b981' },
];

// Mock Data 2: Weekly Scan Activity
const weeklyActivityData = [
  { day: 'Mon', total: 180, healthy: 140, diseased: 40 },
  { day: 'Tue', total: 220, healthy: 170, diseased: 50 },
  { day: 'Wed', total: 195, healthy: 150, diseased: 45 },
  { day: 'Thu', total: 240, healthy: 185, diseased: 55 },
  { day: 'Fri', total: 270, healthy: 210, diseased: 60 },
  { day: 'Sat', total: 210, healthy: 160, diseased: 50 },
  { day: 'Sun', total: 113, healthy: 85, diseased: 28 },
];

// Mock Data 3: Crop Analysis
const cropAnalysisData = [
  { crop: 'Tomato', totalScans: 420, healthy: 310, diseased: 110 },
  { crop: 'Potato', totalScans: 310, healthy: 251, diseased: 59 },
  { crop: 'Rice', totalScans: 290, healthy: 226, diseased: 64 },
  { crop: 'Cotton', totalScans: 210, healthy: 149, diseased: 61 },
  { crop: 'Maize', totalScans: 198, healthy: 166, diseased: 32 },
];

// Custom Dark Tooltip Component
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-xl border border-white/20 shadow-2xl text-xs space-y-1 backdrop-blur-md">
        {label && <p className="font-bold text-white mb-1 font-mono">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              {entry.name || entry.dataKey}:
            </span>
            <span className="font-mono font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function DashboardCharts() {
  return (
    <div className="space-y-6 mb-8">
      
      {/* Top Row: Weekly Activity (Area Chart) & Disease Distribution (Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Scan Activity Area Chart (8 cols on lg) */}
        <Card className="lg:col-span-8 p-0 border border-white/10 overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Weekly Scan Activity
                </CardTitle>
                <CardDescription>
                  Volume of leaf scans processed over the past 7 days
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <span className="text-slate-300">Healthy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500" />
                  <span className="text-slate-300">Diseased</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-2">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="healthyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="diseasedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="healthy"
                    name="Healthy Scans"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#healthyGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="diseased"
                    name="Diseased Scans"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#diseasedGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Disease Distribution Pie Chart (4 cols on lg) */}
        <Card className="lg:col-span-4 p-0 border border-white/10 overflow-hidden">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Disease Distribution
            </CardTitle>
            <CardDescription>Proportion of identified leaf pathogens</CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-2">
            <div className="h-72 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {diseaseDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.4)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-[11px] text-slate-300 font-medium">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-2xl font-extrabold text-white font-mono">342</span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Cases</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Row: Crop Analysis Stacked Bar Chart */}
      <Card className="p-0 border border-white/10 overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Crop Breakdown & Health Ratio
              </CardTitle>
              <CardDescription>
                Scan volume comparison across all supported agricultural species
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropAnalysisData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="crop" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="healthy" name="Healthy Scans" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="diseased" name="Diseased Scans" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
