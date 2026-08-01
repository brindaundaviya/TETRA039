import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES, APP_NAME } from '@/utils/constants';

import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { SupportedCropsSection } from './components/SupportedCropsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { StatsSection } from './components/StatsSection';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-primary-500 selection:text-white">
      
      {/* Dark Ambient Gradient Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/75 border-b border-white/10 transition-colors">
        <div className="page-container py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to={ROUTES.LANDING} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-300 transition-colors">
                {APP_NAME} <span className="text-primary-400">AI</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">TETRA039</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-primary-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('crops')}
              className="hover:text-primary-400 transition-colors"
            >
              Supported Crops
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-primary-400 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('why-choose')}
              className="hover:text-primary-400 transition-colors"
            >
              Why Choose
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-primary-400 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to={ROUTES.DASHBOARD}>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                Dashboard
              </Button>
            </Link>
            <Link to={ROUTES.DETECTION}>
              <Button variant="primary" size="sm" className="shadow-glow font-semibold">
                Start Detection
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/10 px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-3 text-base font-medium text-slate-300">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left hover:text-primary-400 transition-colors py-1"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('crops')}
                className="text-left hover:text-primary-400 transition-colors py-1"
              >
                Supported Crops
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left hover:text-primary-400 transition-colors py-1"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('why-choose')}
                className="text-left hover:text-primary-400 transition-colors py-1"
              >
                Why Choose
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left hover:text-primary-400 transition-colors py-1"
              >
                FAQ
              </button>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <Link to={ROUTES.DETECTION} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" fullWidth className="shadow-glow">
                  Start Detection
                </Button>
              </Link>
              <Link to={ROUTES.DASHBOARD} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" fullWidth>
                  Open Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Landing Page Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <SupportedCropsSection />
        <HowItWorksSection />
        <StatsSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <FooterSection />

    </div>
  );
}
