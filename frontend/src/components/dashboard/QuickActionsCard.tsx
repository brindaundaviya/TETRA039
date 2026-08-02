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
];

export function QuickActionsCard() {
  return (
    <Card className="p-0 border border-white/10 overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Farm Actions
        </CardTitle>
        <CardDescription>Simple steps for fast crop checks and field decisions</CardDescription>
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
