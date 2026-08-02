import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import { ROUTES, APP_NAME } from '@/utils/constants';

interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItemConfig[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.25L12 4l9 7.25V20a1 1 0 01-1 1h-4v-6H8v6H4a1 1 0 01-1-1v-8.75z" />
      </svg>
    ),
  },
  {
    label: 'Scan Crop',
    path: ROUTES.DETECTION,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 012-2h2l1-2h4l1 2h2a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
  },
  {
    label: 'Scan History',
    path: ROUTES.HISTORY,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar navigation"
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-[0_0_45px_rgba(0,0,0,0.35)]',
          'transition-transform duration-300 ease-out',
          'lg:translate-x-0 lg:fixed',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="border-b border-white/10 px-5 py-5">
          <NavLink to={ROUTES.LANDING} className="flex items-center gap-3 rounded-2xl focus-ring">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-primary-500 shadow-glow">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white">{APP_NAME}</h1>
              <p className="text-xs font-medium text-emerald-400">Farm-friendly crop care</p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar navigation"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] font-semibold transition-all duration-200 focus-ring',
                  isActive
                    ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.18)]'
                    : 'text-slate-300 hover:bg-white/8 hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-emerald-300' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
            <p className="text-sm font-semibold text-white">Today's field support</p>
            <p className="mt-1 text-sm text-emerald-200">Quick scans, weather alerts, and simple care steps.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
