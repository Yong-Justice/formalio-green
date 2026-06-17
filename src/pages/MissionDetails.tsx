import { ArrowLeft, Calendar, Clock, Droplet, Footprints, Hand, Leaf, MapPin, Share2, Shield, Sun, Users } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMissionStore } from '../store/missionStore';
import { statusLabel } from '../utils/statusLabels';

const heroImage = 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=80';

const bringItems = [
  { label: 'Gloves', icon: Hand },
  { label: 'Water Bottle', icon: Droplet },
  { label: 'Closed Shoes', icon: Footprints },
  { label: 'Hat', icon: Sun },
  { label: 'Team Spirit', icon: Leaf },
];

function formatMissionDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day));
}

function formatClock(time: string, addHours = 0) {
  const [hours, minutes] = time.split(':').map(Number);
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(2026, 0, 1, hours + addHours, minutes));
}

function categoryLabel(category: string) {
  return statusLabel(category);
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
  const joinedCount = activeMission.volunteersJoined;
  const progressPercent = Math.min(100, Math.round((joinedCount / activeMission.volunteersNeeded) * 100));
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
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-5 pb-5 text-ink">
      <header className="sticky top-0 z-20 -mx-5 flex h-16 items-center justify-between bg-white/95 px-5 backdrop-blur">
        <button type="button" onClick={() => navigate(-1)} className="flex h-11 w-11 items-center justify-center rounded-full text-ink" aria-label="Go back">
          <ArrowLeft size={27} />
        </button>
        <h1 className="text-xl font-extrabold">Mission Details</h1>
        <button type="button" onClick={handleShare} className="flex h-11 w-11 items-center justify-center rounded-full text-ink" aria-label="Share mission">
          <Share2 size={24} />
        </button>
      </header>

      <section
        className="relative h-44 overflow-hidden rounded-2xl bg-cover bg-center shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(6,78,59,0.08), rgba(6,78,59,0.35)), url(${heroImage})` }}
      >
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-green-dark/85 px-4 py-2 text-sm font-bold text-white">
          <Leaf size={18} /> Environment
        </span>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">{mission.title}</h2>
            <p className="mt-3 flex items-center gap-2 text-base font-bold">
              <MapPin size={20} className="text-primary" />
              {mission.city}, {mission.region}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-green-light px-4 py-2 text-sm font-bold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {statusLabel(mission.status)}
          </span>
        </div>

        <p className="mt-4 text-base leading-relaxed text-slate-600">{mission.description}</p>

        <div className="my-5 h-px bg-slate-200" />

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Calendar size={28} className="text-primary" />
            <p className="text-xs text-slate-500">Date</p>
            <p className="text-xs font-extrabold leading-snug">{formatMissionDate(mission.missionDate)}</p>
          </div>
          <div className="space-y-1">
            <Clock size={28} className="text-primary" />
            <p className="text-xs text-slate-500">Time</p>
            <p className="text-xs font-extrabold leading-snug">{missionTimeWindow}</p>
          </div>
          <div className="space-y-1">
            <Users size={30} className="text-primary" />
            <p className="text-xs text-slate-500">Volunteers</p>
            <p className="text-xs font-extrabold leading-snug">{mission.volunteersNeeded} people</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1.4fr_1fr] overflow-hidden rounded-2xl border border-green-light bg-gradient-to-br from-white to-green-light/40">
          <div className="p-4">
            <div className="mb-2 flex items-center gap-3">
              <Users size={29} className="text-primary" />
              <p className="text-sm font-semibold text-slate-600">Registered Participants</p>
            </div>
            <p className="text-2xl font-extrabold text-primary">
              {joinedCount} <span className="text-base text-slate-500">/ {mission.volunteersNeeded}</span>
            </p>
            <div className="mt-3 h-2 rounded-full bg-green-light">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="border-l border-green-200 p-4">
            <p className="text-sm font-semibold text-slate-600">Reward</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Leaf size={27} />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-primary">+{mission.ecoPointsReward}</p>
                <p className="text-xs font-semibold text-slate-500">Eco Points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
        <h2 className="text-xl font-extrabold">What to Bring</h2>
        <div className="mt-4 grid grid-cols-5 divide-x divide-slate-100 text-center">
          {bringItems.map(({ label, icon: Icon }) => (
            <div key={label} className="px-1">
              <Icon size={27} className="mx-auto text-primary" />
              <p className="mt-2 text-[11px] font-medium leading-tight text-slate-700">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <Shield size={34} className="shrink-0 text-mission" />
          <div>
            <p className="font-extrabold text-slate-900">Safety First</p>
            <p className="mt-1 text-sm leading-snug text-slate-700">Stay hydrated, wear protective gear, and follow volunteer leads for guidance.</p>
          </div>
        </div>
      </section>

      <button type="button" onClick={handleJoinMission} className="mt-4 flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-primary text-xl font-extrabold text-white shadow-[0_12px_22px_rgba(22,163,74,0.28)]">
        <Leaf size={28} />
        {hasJoined ? 'Joined Mission' : 'Join Mission'}
      </button>
      <Link to={`/submit-proof/${mission.id}`} className="mt-3 text-center text-sm font-bold text-primary">Submit proof after the mission</Link>
      <p className="mt-2 text-center text-xs font-semibold text-slate-400">{categoryLabel(mission.category)}</p>
    </main>
  );
}
