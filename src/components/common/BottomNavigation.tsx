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
    <nav className="grid grid-cols-5 border-t border-slate-200 bg-white px-2 py-2">
      {tabs.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] font-medium ${
              isActive ? 'text-primary' : 'text-slate-500'
            }`
          }
        >
          <Icon size={20} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
