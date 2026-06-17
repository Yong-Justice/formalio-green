import { Home, Map, PlusCircle, Sprout, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Map', to: '/map', icon: Map },
  { label: 'Missions', to: '/missions', icon: Sprout },
  { label: 'Report', to: '/report', icon: PlusCircle },
  { label: 'Profile', to: '/profile', icon: User },
];

export default function BottomNavigation() {
  return (
    <nav className="mx-3 mb-3 grid grid-cols-5 rounded-3xl border border-slate-100 bg-white px-2 py-2 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      {tabs.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold ${
              isActive ? 'text-primary' : 'text-slate-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
              <span className={`h-1 w-5 rounded-full bg-current ${isActive ? 'opacity-100' : 'opacity-0'}`} />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
