import { motion } from 'framer-motion';

const STATS_DATA = [
  {
    id: 'total-scans',
    label: 'Total Scans',
    value: '1,428',
    description: 'Lifetime leaf diagnostic scans',
    trend: '+12.4%',
    trendType: 'positive',
    trendLabel: 'vs last week',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    borderColor: 'hover:border-emerald-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'diseases-detected',
    label: 'Diseases Detected',
    value: '342',
    description: 'Identified pathogen infections',
    trend: '-5.2%',
    trendType: 'positive', // lower disease rate is positive
    trendLabel: 'vs last week',
    iconBg: 'bg-amber-500/10 text-amber-400',
    borderColor: 'hover:border-amber-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: 'healthy-plants',
    label: 'Healthy Plants',
    value: '1,086',
    description: 'Disease-free crop validations',
    trend: '76.0%',
    trendType: 'positive',
    trendLabel: 'health rate',
    iconBg: 'bg-primary-500/10 text-primary-400',
    borderColor: 'hover:border-primary-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'high-risk-cases',
    label: 'High Risk Cases',
    value: '24',
    description: 'Requires urgent treatment spray',
    trend: 'Action Needed',
    trendType: 'negative',
    trendLabel: 'urgent',
    iconBg: 'bg-red-500/10 text-red-400',
    borderColor: 'hover:border-red-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'ai-accuracy',
    label: 'AI Model Accuracy',
    value: '99.4%',
    description: 'Fine-tuned vision precision',
    trend: '+0.2%',
    trendType: 'positive',
    trendLabel: 'v2.4 engine',
    iconBg: 'bg-accent-500/10 text-accent-400',
    borderColor: 'hover:border-accent-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'supported-crops',
    label: 'Supported Crops',
    value: '5 Species',
    description: 'Tomato, Potato, Rice, Cotton, Maize',
    trend: 'Active',
    trendType: 'neutral',
    trendLabel: 'models ready',
    iconBg: 'bg-sky-500/10 text-sky-400',
    borderColor: 'hover:border-sky-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.865D19.99 19.99 0 0012 3a9.99 9.99 0 00-8.945 0.935z" />
      </svg>
    ),
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
      {STATS_DATA.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`glass-card p-5 rounded-2xl border border-white/10 ${stat.borderColor} transition-all duration-300 relative group flex flex-col justify-between`}
        >
          <div>
            {/* Header Icon & Trend */}
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl glass flex items-center justify-center ${stat.iconBg} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
                  stat.trendType === 'positive'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : stat.trendType === 'negative'
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-slate-500/10 border-white/10 text-slate-300'
                }`}
              >
                {stat.trend}
              </span>
            </div>

            {/* Value & Label */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                {stat.label}
              </span>
              <div className="text-2xl font-extrabold text-white font-mono tracking-tight group-hover:text-primary-300 transition-colors">
                {stat.value}
              </div>
            </div>
          </div>

          {/* Subtext */}
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">{stat.description}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
