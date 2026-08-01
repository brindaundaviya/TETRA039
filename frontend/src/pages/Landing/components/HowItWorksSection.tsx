import { motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'Upload Leaf',
    description: 'Capture or drag-and-drop a high-resolution photo of the affected crop leaf directly in the browser web interface.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Step 1',
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Deep convolutional neural network scans cellular leaf patterns, lesion textures, and discoloration nodes in real-time.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    badge: 'Step 2',
  },
  {
    step: '03',
    title: 'Disease Prediction',
    description: 'Receive an instant, highly accurate disease diagnosis complete with confidence percentage and severity assessment.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badge: 'Step 3',
  },
  {
    step: '04',
    title: 'Treatment Recommendation',
    description: 'Access tailored curative advice, chemical/organic treatment options, and preventive field guidelines to protect your yield.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    badge: 'Step 4',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 relative z-10 border-t border-white/5">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full glass text-xs sm:text-sm font-medium text-accent-400 border border-accent-500/30">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            How <span className="gradient-text">CropGuard AI</span> Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From raw leaf photograph to actionable agronomic advisory in four seamless steps.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline on Desktop / Vertical Stack on Mobile */}
        <div className="relative">
          
          {/* Desktop Connecting Glowing Path */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-primary-500/10 via-primary-500/40 to-accent-500/10 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((stepItem, index) => (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-primary-500/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Icon & Number Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary p-0.5 shadow-glow group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-primary-400">
                        {stepItem.icon}
                      </div>
                    </div>
                    <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-primary-400/50 transition-colors">
                      {stepItem.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                {/* Arrow Connector on Mobile/Tablet */}
                {index < STEPS.length - 1 && (
                  <div className="lg:hidden mt-6 pt-3 flex items-center justify-center text-primary-400/60">
                    <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
