import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

export function WelcomeHeader() {
  const currentHour = new Date().getHours();
  let timeGreeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 17) {
    timeGreeting = 'Good Afternoon';
  } else if (currentHour >= 17) {
    timeGreeting = 'Good Evening';
  }

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const quotes = [
    'Healthy crops today ensure a prosperous harvest tomorrow.',
    'A quick scan today can protect your field tomorrow.',
    'Simple checks now can save time, water, and harvest.',
    'Small actions today lead to stronger crops later.',
  ];
  // Select a quote deterministically based on day of month
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="relative glass-card p-6 sm:p-8 rounded-3xl border border-white/10 overflow-hidden mb-8 group">
      
      {/* Background Decorative Gradient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Welcome Message & Date */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              {formattedDate}
            </span>
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-slate-400">Field support ready</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {timeGreeting}, Farmer <span className="ml-1 inline-block animate-bounce">👋</span>
          </h1>

          <p className="flex items-center gap-2 text-sm leading-relaxed text-slate-300 sm:text-base">
            <svg className="h-4 w-4 flex-shrink-0 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            “{todayQuote}”
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Link to={ROUTES.DETECTION} className="w-full sm:w-auto block">
            <Button size="lg" className="w-full sm:w-auto px-6 py-3.5 font-semibold shadow-glow group/btn">
              <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Scan Crop</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
