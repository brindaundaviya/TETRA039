import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ target, decimals = 0, prefix = '', suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * target);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    label: 'Model Accuracy',
    target: 99.4,
    decimals: 1,
    suffix: '%',
    description: 'Empirically validated on thousands of leaf validation sets',
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'hover:border-emerald-500/40',
  },
  {
    label: 'Inference Speed',
    target: 500,
    prefix: '< ',
    suffix: 'ms',
    description: 'Sub-second GPU-accelerated deep learning diagnosis',
    iconColor: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
    borderColor: 'hover:border-primary-500/40',
  },
  {
    label: 'Supported Crops',
    target: 5,
    suffix: '+',
    description: 'Tailored models for Tomato, Potato, Rice, Cotton & Maize',
    iconColor: 'text-secondary-400',
    bgColor: 'bg-secondary-500/10',
    borderColor: 'hover:border-secondary-500/40',
  },
  {
    label: 'Farmer Scans',
    target: 50,
    suffix: 'k+',
    description: 'Demonstrated crop scans processed in regional trials',
    iconColor: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
    borderColor: 'hover:border-accent-500/40',
  },
];

export function StatsSection() {
  return (
    <section id="why-choose" className="py-20 relative z-10 border-t border-white/5 bg-slate-950/60">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full glass text-xs sm:text-sm font-medium text-emerald-400 border border-emerald-500/30">
            Why Choose CropGuard AI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            High Performance <span className="gradient-text">By The Numbers</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Built for national-level scalability, precision, and ease of use in diverse agricultural conditions.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`glass-card p-6 sm:p-7 rounded-3xl border border-white/10 ${stat.borderColor} transition-all duration-300 relative overflow-hidden group text-center flex flex-col justify-between`}
            >
              <div>
                <div className={`w-12 h-12 mx-auto rounded-2xl ${stat.bgColor} flex items-center justify-center ${stat.iconColor} mb-5 group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight mb-2 group-hover:text-primary-300 transition-colors">
                  <AnimatedCounter
                    target={stat.target}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                <h3 className="text-base font-semibold text-slate-200 mb-2">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs text-slate-400 pt-3 border-t border-white/5 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
