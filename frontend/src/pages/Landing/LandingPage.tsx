import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ROUTES, APP_NAME, APP_TAGLINE } from '@/utils/constants';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-10 page-container py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">{APP_NAME}</span>
        </div>
        <Link to={ROUTES.DASHBOARD}>
          <Button variant="outline" size="sm">Open App</Button>
        </Link>
      </nav>

      <section className="relative z-10 page-container py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary-400 mb-6">
            Tetrathon 2026 · Team TETRA039
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Early Crop Disease{' '}
            <span className="gradient-text">Detection</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            {APP_TAGLINE}. Upload crop leaf images, get AI-powered disease predictions
            with confidence scores, and receive treatment recommendations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.DETECTION}>
              <Button size="lg">Start Detection</Button>
            </Link>
            <Link to={ROUTES.ABOUT}>
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { title: 'AI Detection', desc: 'Upload leaf images for instant disease analysis', iconBg: 'bg-primary-500/10', dot: 'bg-primary-500' },
            { title: 'Smart Advisory', desc: 'Get treatment and preventive recommendations', iconBg: 'bg-secondary-500/10', dot: 'bg-secondary-500' },
            { title: 'Scan History', desc: 'Track all your crop health assessments', iconBg: 'bg-accent-500/10', dot: 'bg-accent-500' },
          ].map((feature) => (
            <div key={feature.title} className="glass-card p-6 text-center">
              <div className={`w-12 h-12 mx-auto rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                <div className={`w-3 h-3 rounded-full ${feature.dot}`} />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 mt-2">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
