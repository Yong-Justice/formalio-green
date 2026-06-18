import { ArrowLeft, CalendarDays, Clock3, Droplet, Footprints, Hand, Leaf, MapPin, Share2, Shield, Sun, Users } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { MissionCategory } from '../types/mission';
import { useAuthStore } from '../store/authStore';
import { useMissionStore } from '../store/missionStore';
import { statusLabel } from '../utils/statusLabels';

const previewImages: Record<MissionCategory, string> = {
  river_cleanup: '/images/missions/river-mifi.jpg',
  cleanup: '/images/missions/cleanup-market.jpg',
  tree_planting: '/images/missions/tree-planting.jpg',
  lake_protection: '/images/missions/lake-baleng.jpg',
  awareness: '/images/missions/awareness.jpg',
};

const bringItems = [
  { label: 'Gloves', icon: Hand },
  { label: 'Bottle', icon: Droplet },
  { label: 'Shoes', icon: Footprints },
  { label: 'Hat', icon: Sun },
  { label: 'Spirit', icon: Leaf },
];

function formatMissionDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day));
}

function formatClock(time: string, addHours = 0) {
  const [hours, minutes] = time.split(':').map(Number);
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(2026, 0, 1, hours + addHours, minutes));
}

export default function MissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mission = useMissionStore((state) => state.getMissionById(id || ''));
  const joinMission = useMissionStore((state) => state.joinMission);
  const hasJoinedMission = useMissionStore((state) => state.hasJoinedMission);
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!mission) {
    return (
      <main className="flex flex-1 flex-col bg-white px-5 py-6">
        <button type="button" onClick={() => navigate(-1)} className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100" aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-extrabold text-ink">Mission not found</h1>
        <Link to="/missions" className="mt-4 font-bold text-primary">Back to missions</Link>
      </main>
    );
  }

  const activeMission = mission;
  const hasJoined = currentUser ? hasJoinedMission(activeMission.id, currentUser.id) : false;
  const progressPercent = Math.min(100, Math.round((activeMission.volunteersJoined / activeMission.volunteersNeeded) * 100));
  const missionTimeWindow = `${formatClock(activeMission.missionTime)} - ${formatClock(activeMission.missionTime, 4)}`;

  function handleJoinMission() {
    if (currentUser) joinMission(activeMission.id, currentUser.id);
  }

  function handleShare() {
    if (navigator.share) {
      void navigator.share({ title: activeMission.title, text: activeMission.description, url: window.location.href }).catch(() => undefined);
    }
  }

  return (
    <main className="flex-1 overflow-y-auto bg-white px-5 pb-28 pt-2 text-ink">
      <header className="sticky top-0 z-20 -mx-5 grid h-14 grid-cols-[44px_1fr_44px] items-center bg-white/95 px-5 backdrop-blur">
        <button type="button" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full text-ink" aria-label="Go back">
          <ArrowLeft size={27} />
        </button>
        <h1 className="text-center text-xl font-extrabold">Mission Details</h1>
        <button type="button" onClick={handleShare} className="flex h-10 w-10 items-center justify-center rounded-full text-ink" aria-label="Share mission">
          <Share2 size={23} />
        </button>
      </header>

      <section className="relative h-[172px] shrink-0 overflow-hidden rounded-2xl bg-green-light shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
        <img src={previewImages[mission.category]} alt={`${mission.title} preview`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-dark/45 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-green-dark/88 px-3.5 py-2 text-sm font-extrabold text-white">
          <Leaf size={17} />
          {statusLabel(mission.category)}
        </span>
      </section>

      <section className="mt-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[25px] font-extrabold leading-tight">{mission.title}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm font-extrabold text-slate-800">
              <MapPin size={18} className="shrink-0 text-primary" />
              {mission.city}, {mission.region}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-green-light px-3 py-1.5 text-sm font-extrabold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {statusLabel(mission.status)}
          </span>
        </div>

        <p className="mt-3 text-[15px] leading-snug text-slate-600">{mission.description}</p>

        <div className="my-4 h-px bg-slate-200" />

        <div className="grid grid-cols-3 gap-3">
          <div>
            <CalendarDays size={25} className="text-primary" />
            <p className="mt-1 text-[11px] text-slate-500">Date</p>
            <p className="text-[11px] font-extrabold leading-snug">{formatMissionDate(mission.missionDate)}</p>
          </div>
          <div>
            <Clock3 size={25} className="text-primary" />
            <p className="mt-1 text-[11px] text-slate-500">Time</p>
            <p className="text-[11px] font-extrabold leading-snug">{missionTimeWindow}</p>
          </div>
          <div>
            <Users size={26} className="text-primary" />
            <p className="mt-1 text-[11px] text-slate-500">Volunteers</p>
            <p className="text-[11px] font-extrabold leading-snug">{mission.volunteersNeeded} people</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1.25fr_1fr] overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-white to-green-light/50">
          <div className="p-3.5">
            <div className="flex items-center gap-2">
              <Users size={25} className="text-primary" />
              <p className="text-sm font-semibold leading-tight text-slate-600">Registered Participants</p>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-primary">
              {mission.volunteersJoined} <span className="text-base text-slate-500">/ {mission.volunteersNeeded}</span>
            </p>
            <div className="mt-2.5 h-2 rounded-full bg-green-light">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="border-l border-green-200 p-3.5">
            <p className="text-sm font-semibold text-slate-600">Reward</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <Leaf size={25} />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-primary">+{mission.ecoPointsReward}</p>
                <p className="text-xs font-semibold text-slate-500">Eco Points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
        <h2 className="text-lg font-extrabold">What to Bring</h2>
        <div className="mt-3 grid grid-cols-5 divide-x divide-slate-100 text-center">
          {bringItems.map(({ label, icon: Icon }) => (
            <div key={label} className="px-1">
              <Icon size={24} className="mx-auto text-primary" />
              <p className="mt-1.5 text-[11px] font-semibold leading-tight text-slate-700">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-3">
          <Shield size={29} className="shrink-0 text-mission" />
          <div>
            <p className="font-extrabold text-slate-900">Safety First</p>
            <p className="mt-0.5 text-sm leading-snug text-slate-700">Stay hydrated, wear protective gear, and follow volunteer leads.</p>
          </div>
        </div>
      </section>

      <button type="button" onClick={handleJoinMission} className="mt-3 flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-primary text-lg font-extrabold text-white shadow-[0_12px_22px_rgba(22,163,74,0.28)]">
        <Leaf size={26} />
        {hasJoined ? 'Joined Mission' : 'Join Mission'}
      </button>
      <Link to={`/submit-proof/${mission.id}`} className="mt-3 text-center text-sm font-extrabold text-primary">Submit proof after the mission</Link>
    </main>
  );
}
