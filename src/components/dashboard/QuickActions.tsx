import { Link } from 'react-router-dom';
import { Camera, ClipboardCheck, Map, Sprout } from 'lucide-react';
import Card from '../common/Card';

export default function QuickActions() {
  const actions = [
    { label: 'Report Problem', to: '/report', icon: Camera, className: 'bg-primary' },
    { label: 'Green Map', to: '/map', icon: Map, className: 'bg-mission' },
    { label: 'Join Mission', to: '/missions', icon: Sprout, className: 'bg-green-dark' },
    { label: 'Admin Verify', to: '/admin-preview', icon: ClipboardCheck, className: 'bg-gold text-ink' },
  ];

  return (
    <Card className="grid grid-cols-2 gap-3">
      {actions.map(({ label, to, icon: Icon, className }) => (
        <Link key={to} className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg px-3 py-3 text-center text-sm font-bold text-white ${className}`} to={to}>
          <Icon size={22} aria-hidden="true" />
          <span>{label}</span>
        </Link>
      ))}
    </Card>
  );
}
