import { motion } from 'framer-motion';

const FEATURES = [
  {
    id: 'ai-detection',
    title: 'AI Disease Detection',
    description: 'Deep neural networks analyze subtle leaf spots, lesions, and discoloration to detect early-stage agricultural diseases with high precision.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Core Engine',
    color: 'from-emerald-500/20 to-green-500/5',
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/40',
  },
  {
    id: 'confidence-score',
    title: 'Confidence Score',
    description: 'Every diagnosis comes with an exact probabilistic confidence score and detailed certainty rating so farmers can make informed decisions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    badge: 'Precision Analytics',
    color: 'from-primary-500/20 to-teal-500/5',
    iconColor: 'text-primary-400',
    borderColor: 'hover:border-primary-500/40',
  },
  {
    id: 'instant-recommendations',
    title: 'Instant Recommendations',
    description: 'Receive curated chemical, organic, and biological treatment advice immediately following every successful leaf scan.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    badge: 'Agronomy Care',
    color: 'from-accent-500/20 to-blue-500/5',
    iconColor: 'text-accent-400',
    borderColor: 'hover:border-accent-500/40',
  },
  {
    id: 'preventive-measures',
    title: 'Preventive Measures',
    description: 'Get proactive field management guidelines to isolate infected crops and protect healthy surrounding yields from outbreak spread.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    badge: 'Field Defense',
    color: 'from-secondary-500/20 to-emerald-500/5',
    iconColor: 'text-secondary-400',
    borderColor: 'hover:border-secondary-500/40',
  },
  {
    id: 'fast-processing',
    title: 'Fast Processing',
    description: 'Optimized inference pipeline delivers rapid results in under 500 milliseconds, suitable for field operations with responsive speed.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    badge: 'Ultra Fast',
    color: 'from-yellow-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/40',
  },
  {
    id: 'multi-crop-support',
    title: 'Multi-Crop Support',
    description: 'Comprehensive support for 5 major staple & cash crops including Tomato, Potato, Rice, Cotton, and Maize with expanding coverage.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.865D19.99 19.99 0 0012 3a9.99 9.99 0 00-8.945 0.935z" />
      </svg>
    ),
    badge: 'Universal Model',
    color: 'from-cyan-500/20 to-sky-500/5',
    iconColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/40',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative z-10 border-t border-white/5">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full glass text-xs sm:text-sm font-medium text-primary-400 border border-primary-500/30">
            Intelligent Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Engineered for Precision <span className="gradient-text">Agronomy</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Empowering agricultural experts and modern farmers with cutting-edge computer vision tools designed for instant field diagnosis.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`glass-card p-7 relative rounded-3xl border border-white/10 ${feature.borderColor} transition-all duration-300 group flex flex-col justify-between overflow-hidden`}
            >
              {/* Subtle Gradient Glow inside Card */}
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${feature.color} rounded-bl-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center ${feature.iconColor} group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                    {feature.badge}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Card Footer Indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-primary-400 transition-colors">
                <span>Explore Capability</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
