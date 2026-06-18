import { ChevronRight, FileText, Flag, HelpCircle, Leaf, MapPin, Settings, Star, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEcoScoreStore } from '../store/ecoScoreStore';

const menuItems = [
  { label: 'Achievements', description: 'View your badges and milestones', Icon: Trophy, to: '/leaderboard' },
  { label: 'My Submissions', description: 'View your reported issues', Icon: FileText, to: '/verification/demo' },
  { label: 'My Missions', description: 'Track your mission progress', Icon: Flag, to: '/missions' },
  { label: 'My Impact', description: "See the impact you've made", Icon: Users, to: '/map' },
  { label: 'Settings', description: 'Manage your preferences', Icon: Settings, to: '/profile' },
  { label: 'Help & Support', description: 'Get help and find answers', Icon: HelpCircle, to: '/profile' },
];

export default function Profile() {
  const user = useAuthStore((state) => state.currentUser);
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const displayScore = Math.min(ecoScore, 320);
  const earnedPoints = Math.max(640, Math.round(displayScore * 2));

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-4 pb-24 pt-4 text-ink">
      <section
        className="relative shrink-0 overflow-hidden rounded-[26px] bg-gradient-to-br from-green-dark via-emerald-900 to-primary p-5 text-white shadow-[0_16px_34px_rgba(6,78,59,0.24)]"
        style={{ height: 286 }}
      >
        <span className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-primary/20" />
        <span className="absolute right-6 top-24 h-2 w-2 rounded-full bg-lime-300/80" />
        <span className="absolute right-24 top-20 h-1.5 w-1.5 rounded-full bg-lime-300/70" />
        <span className="absolute right-32 top-[136px] h-1 w-1 rounded-full bg-lime-300/80" />
        <button type="button" className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur" aria-label="Profile settings">
          <Settings size={25} />
        </button>

        <div className="relative z-10">
          <h1 className="text-[32px] font-extrabold leading-tight">Profile</h1>
          <p className="mt-2 max-w-[180px] text-[17px] font-medium leading-snug text-white/90">Manage your account and track your impact</p>
        </div>

        <div className="absolute left-5 top-[130px] z-10 h-[108px] w-[108px]">
          <img
            src="/images/justice-profile.jpg"
            alt="Justice profile"
            className="h-full w-full rounded-full border-[6px] border-white bg-white object-cover shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
          />
          <span className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-lg">
            <Leaf size={24} />
          </span>
        </div>

        <div className="absolute left-[142px] right-5 top-[130px] z-10">
          <h2 className="text-[28px] font-extrabold leading-tight drop-shadow-sm">{user?.fullName || 'Justice'}</h2>
          <p className="mt-2 flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold leading-tight text-white/95 drop-shadow-sm">
            <MapPin size={16} className="shrink-0" />
            {user?.city || 'Bafoussam'}, {user?.region || 'West Region'}
          </p>
          <p className="mt-2 flex items-center gap-1.5 whitespace-nowrap text-[13px] font-extrabold leading-tight text-lime-200 drop-shadow-sm">
            <Leaf size={16} className="shrink-0" />
            Level 2 - Green Citizen
          </p>
        </div>

        <div className="absolute left-[142px] right-5 top-[222px] z-10 h-px bg-white/20" />

        <div className="absolute bottom-4 left-[142px] right-5 z-10 grid grid-cols-[96px_1fr] items-end gap-3">
          <div>
            <p className="text-xs text-white/90">Eco Score</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[32px] font-extrabold leading-none">
              {displayScore}
              <Leaf size={22} className="text-lime-300" />
            </p>
          </div>
          <p className="pb-1 text-[12px] font-semibold leading-snug text-white">Good job! Keep it up.</p>
        </div>

        <div className="absolute bottom-0 right-0 z-0 h-[142px] w-36 opacity-25">
          <Leaf size={64} className="absolute bottom-8 right-9 rotate-[-22deg] text-lime-300" />
          <Leaf size={54} className="absolute bottom-8 right-0 rotate-[16deg] text-lime-400" />
          <Leaf size={40} className="absolute bottom-[62px] right-[76px] rotate-[-42deg] text-lime-200/80" />
          <span className="absolute bottom-0 right-0 h-9 w-40 rounded-tl-full bg-black/20" />
        </div>
      </section>

      <section className="mt-3 grid shrink-0 grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-2.5 text-center shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-green-light text-primary">
            <FileText size={23} />
          </span>
          <p className="mt-2 text-sm text-slate-600">Reports</p>
          <p className="text-[28px] font-extrabold leading-tight text-primary">12</p>
          <p className="text-xs font-semibold text-slate-500">Total</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-2.5 text-center shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-green-light text-primary">
            <Flag size={23} />
          </span>
          <p className="mt-2 text-sm text-slate-600">Missions</p>
          <p className="text-[28px] font-extrabold leading-tight text-primary">5</p>
          <p className="text-xs font-semibold text-slate-500">Completed</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-2.5 text-center shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100 text-gold">
            <Star size={25} fill="currentColor" />
          </span>
          <p className="mt-2 text-sm text-slate-600">Points</p>
          <p className="text-[28px] font-extrabold leading-tight text-primary">{earnedPoints}</p>
          <p className="text-xs font-semibold text-slate-500">Earned</p>
        </div>
      </section>

      <section className="mt-3 shrink-0 space-y-0 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        {menuItems.map(({ label, description, Icon, to }) => (
          <Link key={label} to={to} className="flex min-h-[62px] items-center gap-3.5 border-b border-slate-100 px-4 last:border-b-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-light text-primary">
              <Icon size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-extrabold leading-tight">{label}</span>
              <span className="mt-1 block text-sm font-medium leading-tight text-slate-500">{description}</span>
            </span>
            <ChevronRight size={24} className="shrink-0 text-slate-700" />
          </Link>
        ))}
      </section>
    </main>
  );
}
