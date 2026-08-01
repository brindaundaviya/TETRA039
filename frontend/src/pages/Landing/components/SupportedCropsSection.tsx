import { motion } from 'framer-motion';

const CROPS = [
  {
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    accuracy: '99.4%',
    diseases: ['Bacterial Spot', 'Early Blight', 'Late Blight', 'Leaf Mold', 'Yellow Leaf Curl'],
    badge: 'High Accuracy',
    badgeBg: 'bg-red-500/10 border-red-500/30 text-red-300',
    accentGradient: 'from-red-500/20 via-emerald-500/10 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 5V2M10 3L14 3M12 5C13.5 3.5 15 3 16.5 3.5M12 5C10.5 3.5 9 3 7.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    accuracy: '98.9%',
    diseases: ['Early Blight', 'Late Blight', 'Healthy Leaf'],
    badge: 'Trained',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    accentGradient: 'from-amber-500/20 via-emerald-500/10 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 20C16.9706 20 20 16.866 20 12C20 7.13401 16.5 4 11.5 4C6.5 4 4 7.5 4 12C4 16.5 7.02944 20 12 20Z" fill="currentColor" fillOpacity="0.15" />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="11" r="1" fill="currentColor" />
        <circle cx="11" cy="15" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Rice',
    scientificName: 'Oryza sativa',
    accuracy: '99.1%',
    diseases: ['Bacterial Blight', 'Brown Spot', 'Leaf Blast', 'Hispa Lesion'],
    badge: 'Staple Crop',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    accentGradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 22V8M12 8C12 5 15 3 18 3M12 8C12 5 9 3 6 3M18 3C18 6 15 9 12 11M6 3C6 6 9 9 12 11M18 9C18 12 15 15 12 17M6 9C6 12 9 15 12 17" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    accuracy: '98.5%',
    diseases: ['Bacterial Blight', 'Target Spot', 'Curl Virus', 'Powdery Mildew'],
    badge: 'Cash Crop',
    badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
    accentGradient: 'from-sky-500/20 via-emerald-500/10 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 21C16.4183 21 20 17.4183 20 13C20 9 16 6 12 3C8 6 4 9 4 13C4 17.4183 7.58172 21 12 21Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 3C12 9 17 12 17 17M12 3C12 9 7 12 7 17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Maize',
    scientificName: 'Zea mays',
    accuracy: '99.0%',
    diseases: ['Cercospora Leaf Spot', 'Common Rust', 'Northern Blight'],
    badge: 'Grain Crop',
    badgeBg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    accentGradient: 'from-yellow-500/20 via-emerald-500/10 to-transparent',
    icon: (
      <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 3C8 3 6 8 6 14C6 18.5 8.5 21 12 21C15.5 21 18 18.5 18 14C18 8 16 3 12 3Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M9 7H15M8 11H16M9 15H15M10 19H14" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function SupportedCropsSection() {
  return (
    <section id="crops" className="py-20 relative z-10 border-t border-white/5 bg-slate-950/40">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full glass text-xs sm:text-sm font-medium text-secondary-400 border border-secondary-500/30">
            Multi-Crop Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Supported <span className="gradient-text">Crops & Taxonomies</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Our deep learning neural networks are fine-tuned on specialized dataset taxonomies across national staple and commercial crop species.
          </p>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CROPS.map((crop, index) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary-500/40 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Top Corner Glow */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${crop.accentGradient} rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none`} />

              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:shadow-glow transition-all">
                    {crop.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">
                      {crop.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 italic">
                      {crop.scientificName}
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${crop.badgeBg}`}>
                  {crop.badge}
                </span>
              </div>

              {/* Diseases Detected Tags */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Detectable Conditions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {crop.diseases.map((d) => (
                    <span key={d} className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-xs border border-white/5">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accuracy Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Model Precision Rating</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {crop.accuracy}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Bonus Expandable Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="glass-card p-6 rounded-3xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary-500/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">More Crops Coming Soon</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Continuous model updates expanding support to Wheat, Sugarcane, Apple, and Soybean.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
