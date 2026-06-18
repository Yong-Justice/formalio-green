import { Bell, CalendarDays, ChevronRight, Leaf, MapPin, Mountain, Sprout, Trophy, Trash2, Users, Waves } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMissionStore } from '../store/missionStore';
import type { Mission, MissionCategory } from '../types/mission';

type MissionFilter = 'all' | 'cleanup' | 'tree_planting' | 'river';

const missionFilters: { id: MissionFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cleanup', label: 'Cleanup' },
  { id: 'tree_planting', label: 'Tree Planting' },
  { id: 'river', label: 'River' },
];

const missionScenes: Record<string, { Icon: typeof Leaf; className: string }> = {
  river_cleanup: { Icon: Waves, className: 'from-blue-100 via-emerald-100 to-green-200 text-mission' },
  lake_protection: { Icon: Mountain, className: 'from-sky-100 via-blue-100 to-emerald-200 text-mission' },
  tree_planting: { Icon: Sprout, className: 'from-lime-100 via-green-light to-emerald-200 text-primary' },
  cleanup: { Icon: Trash2, className: 'from-orange-50 via-green-light to-emerald-100 text-primary' },
  awareness: { Icon: Leaf, className: 'from-green-light via-lime-100 to-white text-primary' },
};

function missionMatchesFilter(mission: Mission, filter: MissionFilter) {
  if (filter === 'all') return true;
  if (filter === 'river') return mission.category === 'river_cleanup' || mission.category === 'lake_protection';
  return mission.category === filter;
}

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day));
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(2026, 0, 1, hours, minutes));
}

function categoryMeta(category: MissionCategory) {
  if (category === 'tree_planting') return { label: 'Tree', Icon: Leaf, className: 'bg-primary text-white' };
  if (category === 'river_cleanup' || category === 'lake_protection') return { label: 'River', Icon: Waves, className: 'bg-mission text-white' };
  return { label: 'Cleanup', Icon: Trash2, className: 'bg-primary text-white' };
}

function MissionScene({ mission, label, Icon: BadgeIcon, badgeClassName }: { mission: Mission; label: string; Icon: typeof Leaf; badgeClassName: string }) {
  const scene = missionScenes[mission.category] || missionScenes.cleanup;
  const SceneIcon = scene.Icon;

  return (
    <Link to={`/missions/${mission.id}`} className={`relative flex h-24 overflow-hidden rounded-2xl bg-gradient-to-br ${scene.className}`}>
      <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase ${badgeClassName}`}>
        <BadgeIcon size={12} /> {label}
      </span>
      <span className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-white/35" />
      <span className="absolute bottom-0 left-0 h-9 w-full bg-gradient-to-t from-green-dark/20 to-transparent" />
      <SceneIcon size={48} className="m-auto drop-shadow-sm" />
    </Link>
  );
}

function MissionCard({ mission, onJoin }: { mission: Mission; onJoin: (missionId: string) => void }) {
  const progress = Math.min(100, Math.round((mission.volunteersJoined / mission.volunteersNeeded) * 100));
  const { label, Icon, className } = categoryMeta(mission.category);

  return (
    <article className="rounded-[20px] border border-slate-100 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
      <div className="grid grid-cols-[96px_1fr] gap-3">
        <MissionScene mission={mission} label={label} Icon={Icon} badgeClassName={className} />

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/missions/${mission.id}`} className="min-w-0 text-[17px] font-extrabold leading-tight text-ink">
              {mission.title}
            </Link>
            <div className="shrink-0 rounded-2xl bg-green-light px-2.5 py-2 text-center text-primary">
              <div className="flex items-center justify-center gap-1 text-lg font-extrabold leading-none">
                <Leaf size={17} />
                {mission.ecoPointsReward}
              </div>
              <p className="mt-0.5 text-[10px] font-semibold text-ink">Eco Points</p>
            </div>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-slate-600">
            <MapPin size={15} className="shrink-0 text-primary" />
            {mission.city}, {mission.region}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
            <CalendarDays size={15} className="shrink-0" />
            <span className="truncate">{formatDate(mission.missionDate)} • {formatTime(mission.missionTime)}</span>
          </p>

          <div className="mt-3 grid grid-cols-[1fr_68px] items-center gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
                <Users size={16} className="shrink-0 text-primary" />
                <span className="font-extrabold text-ink">{mission.volunteersJoined}</span> / {mission.volunteersNeeded} Volunteers
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-green-light">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => onJoin(mission.id)}
              className={`h-11 rounded-xl text-base font-extrabold text-white shadow-[0_8px_18px_rgba(22,163,74,0.22)] ${
                mission.category === 'lake_protection' ? 'bg-mission' : 'bg-primary'
              }`}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Missions() {
  const missions = useMissionStore((state) => state.missions);
  const joinMission = useMissionStore((state) => state.joinMission);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [filter, setFilter] = useState<MissionFilter>('all');

  const activeMissions = useMemo(
    () => missions.filter((mission) => mission.status !== 'completed' && mission.status !== 'cancelled' && missionMatchesFilter(mission, filter)),
    [filter, missions],
  );

  function handleJoin(missionId: string) {
    if (currentUser) joinMission(missionId, currentUser.id);
  }

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-4 pb-7 pt-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[30px] font-extrabold leading-tight text-ink">Active Missions</h1>
          <p className="mt-1 text-lg text-slate-500">Join and make an impact</p>
        </div>
        <button type="button" className="relative mt-2 flex h-12 w-12 items-center justify-center rounded-full text-ink" aria-label="Notifications">
          <Bell size={32} />
          <span className="absolute right-2 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary" />
        </button>
      </header>

      <Link
        to="/challenges"
        className="mt-5 flex min-h-14 items-center justify-between rounded-2xl border border-green-100 bg-green-light/70 px-4 text-primary shadow-[0_8px_20px_rgba(22,163,74,0.10)]"
        aria-label="Open challenges"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <Trophy size={21} />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-extrabold leading-tight">Challenges</span>
            <span className="block text-sm font-semibold leading-tight text-green-dark/70">Earn more Eco Points</span>
          </span>
        </span>
        <ChevronRight size={24} className="shrink-0" />
      </Link>

      <div className="mt-5 flex min-h-[48px] items-center gap-2 overflow-x-auto py-1">
        {missionFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`h-10 shrink-0 rounded-3xl border px-4 text-sm font-semibold transition ${
              filter === item.id ? 'border-primary bg-primary text-white shadow-[0_8px_16px_rgba(22,163,74,0.22)]' : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-4 space-y-3">
        {activeMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} onJoin={handleJoin} />
        ))}
      </section>
    </main>
  );
}
