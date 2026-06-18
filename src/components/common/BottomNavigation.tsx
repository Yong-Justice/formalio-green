import { FileText, Flag, Home, Map, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { label: 'Home', to: '/home', icon: Home, matches: ['/home'] },
  { label: 'Map', to: '/map', icon: Map, matches: ['/map'] },
  { label: 'Missions', to: '/missions', icon: Flag, matches: ['/missions', '/challenges'] },
  { label: 'Report', to: '/report', icon: FileText, matches: ['/report', '/submit-proof'] },
  { label: 'Profile', to: '/profile', icon: User, matches: ['/profile'] },
];

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="mx-3 mb-3 grid grid-cols-5 rounded-3xl border border-slate-100 bg-white px-2 py-2 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      {tabs.map(({ label, to, icon: Icon, matches }) => {
        const isActive = matches.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

        return (
          <Link
            key={to}
            to={to}
            className={`flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold ${
              isActive ? 'text-primary' : 'text-slate-500'
            }`}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
            <span className={`h-1 w-5 rounded-full bg-current ${isActive ? 'opacity-100' : 'opacity-0'}`} />
          </Link>
        );
      })}
    </nav>
  );
}
