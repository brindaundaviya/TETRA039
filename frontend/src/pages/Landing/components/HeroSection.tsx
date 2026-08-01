import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-primary-500/30 text-xs sm:text-sm font-medium text-primary-300 shadow-glow">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span>Tetrathon 2026 · Team TETRA039</span>
              <span className="text-white/30">•</span>
              <span className="text-emerald-400 font-semibold">National AI Hackathon</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                CropGuard <span className="gradient-text">AI</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-200">
                AI-Powered Early Crop Disease Detection System
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transforming agricultural crop protection with deep computer vision. Upload leaf photos for instant diagnosis, precision confidence scoring, and tailored curative treatment advisories in seconds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to={ROUTES.DETECTION} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-base font-semibold shadow-glow group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Detect Disease Now
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold border-white/20 hover:border-white/40"
              >
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant 500ms Diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>99.4% Model Precision</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5 Major Crops</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Graphic Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Main AI Scanner Mockup Card */}
            <div className="relative glass-card p-6 sm:p-7 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">CropGuard-Vision-v2.4</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-primary-500/20 text-primary-300 text-xs font-mono border border-primary-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping" />
                  LIVE SCANNER
                </span>
              </div>

              {/* Scanning Target Display Area */}
              <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl bg-slate-900/90 border border-emerald-500/30 overflow-hidden flex items-center justify-center group">
                
                {/* SVG Leaf Canvas Illustration */}
                <svg className="w-4/5 h-4/5 text-emerald-600/60" viewBox="0 0 200 200" fill="none">
                  {/* Stem & Veins */}
                  <path d="M100 180 Q95 100 100 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M100 140 Q130 120 150 110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M100 120 Q60 100 45 90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M100 90 Q140 70 160 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M100 70 Q55 50 40 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Leaf Outline */}
                  <path d="M100 20 C160 50 170 130 100 180 C30 130 40 50 100 20 Z" fill="url(#leaf-gradient)" fillOpacity="0.35" stroke="#22c55e" strokeWidth="2" />
                  
                  {/* Simulated Lesion Hotspots */}
                  <circle cx="125" cy="85" r="14" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="75" cy="115" r="10" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  <defs>
                    <linearGradient id="leaf-gradient" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22c55e" />
                      <stop offset="1" stopColor="#064e3b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated Laser Scanning Line */}
                <motion.div
                  animate={{ y: ['-100%', '100%', '-100%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_15px_#22c55e]"
                />

                {/* Bounding Box Simulation */}
                <div className="absolute top-8 right-12 border-2 border-dashed border-red-400/90 rounded-lg p-2 bg-red-500/10 backdrop-blur-xs flex flex-col items-center">
                  <span className="text-[10px] font-mono text-red-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-red-500/30 mb-1">
                    Pathogen Identified
                  </span>
                  <span className="text-xs font-bold text-white">Alternaria solani</span>
                </div>

                {/* Target Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-32 h-32 border border-primary-500/30 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 border border-primary-400/50 rounded-full border-t-transparent animate-spin" />
                  </div>
                </div>

              </div>

              {/* Real-time Diagnostics Output Card */}
              <div className="mt-5 p-4 rounded-2xl bg-surface-50/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-sm font-semibold text-white">Diagnosis: Tomato Early Blight</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    99.4% Match
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Fungal spots detected on leaf foliage. Immediate treatment advised with copper hydroxide spray.
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Target: Lycopersicon esculentum</span>
                  <span className="text-primary-400">Status: Verified</span>
                </div>
              </div>

              {/* Floating Decorative Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-4 px-4 py-2.5 rounded-2xl glass border border-primary-500/30 text-xs font-medium text-white shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white">Sub-500ms</div>
                  <div className="text-[10px] text-slate-400">Real-time Inference</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-3 px-4 py-2.5 rounded-2xl glass border border-accent-500/30 text-xs font-medium text-white shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-xl bg-accent-500/20 flex items-center justify-center text-accent-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white">Multi-Crop Trained</div>
                  <div className="text-[10px] text-slate-400">5+ Crop Taxonomies</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
