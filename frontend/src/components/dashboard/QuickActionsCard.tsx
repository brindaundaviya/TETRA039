import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { ROUTES } from '@/utils/constants';

const ACTIONS = [
  {
    title: 'Upload Leaf Scan',
    description: 'Capture or drag leaf image for instant AI diagnosis',
    route: ROUTES.DETECTION,
    color: 'from-emerald-500/20 to-primary-500/10',
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'View Scan History',
    description: 'Review historical diagnosis logs & treatment notes',
    route: ROUTES.HISTORY,
    color: 'from-accent-500/20 to-blue-500/10',
    iconColor: 'text-accent-400',
    borderColor: 'hover:border-accent-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Supported Crops Guide',
    description: 'Explore dataset taxonomies for Tomato, Potato, etc.',
    route: `${ROUTES.LANDING}#crops`,
    color: 'from-secondary-500/20 to-emerald-500/10',
    iconColor: 'text-secondary-400',
    borderColor: 'hover:border-secondary-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.865D19.99 19.99 0 0012 3a9.99 9.99 0 00-8.945 0.935z" />
      </svg>
    ),
  },
  {
    title: 'How AI Pipeline Works',
    description: 'Understand deep computer vision architecture',
    route: ROUTES.ABOUT,
    color: 'from-amber-500/20 to-orange-500/10',
    iconColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/40',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export function QuickActionsCard() {
  return (
    <Card className="p-0 border border-white/10 overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Operations
        </CardTitle>
        <CardDescription>Shortcut workflows for rapid agronomic analysis</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACTIONS.map((action) => (
            <Link key={action.title} to={action.route}>
              <div className={`p-4 rounded-2xl glass border border-white/10 ${action.borderColor} transition-all duration-300 group flex items-start gap-4 cursor-pointer relative overflow-hidden`}>
                <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center ${action.iconColor} group-hover:scale-110 transition-transform flex-shrink-0`}>
                  {action.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary-300 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
