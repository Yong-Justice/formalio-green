import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Flag, Leaf, Map, MapPin, Search } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMissionStore } from '../store/missionStore';
import { useProofStore } from '../store/proofStore';

const timelineSteps = [
  {
    title: 'Pending',
    time: 'May 21, 2025 - 10:24 AM',
    body: 'Received and waiting for review.',
    Icon: Clock3,
    tone: 'yellow',
    badge: undefined,
  },
  {
    title: 'Under Review',
    time: 'May 22, 2025 - 9:15 AM',
    body: 'Team review in progress.',
    Icon: Search,
    tone: 'orange',
    badge: undefined,
  },
  {
    title: 'Approved',
    time: 'May 23, 2025 - 2:45 PM',
    body: 'Report approved.',
    Icon: CheckCircle2,
    tone: 'green',
    badge: '150 Eco Points earned',
  },
  {
    title: 'Completed',
    time: 'May 23, 2025 - 3:05 PM',
    body: 'Added to the Green Map.',
    Icon: Flag,
    tone: 'green',
    badge: 'Green Map visible',
  },
] as const;

function stepClasses(tone: 'yellow' | 'orange' | 'green') {
  if (tone === 'yellow') return 'bg-yellow-400 text-white shadow-[0_6px_14px_rgba(250,204,21,0.25)]';
  if (tone === 'orange') return 'bg-warning text-white shadow-[0_6px_14px_rgba(249,115,22,0.25)]';
  return 'bg-primary text-white shadow-[0_6px_14px_rgba(22,163,74,0.24)]';
}

function numberClasses(tone: 'yellow' | 'orange' | 'green') {
  if (tone === 'yellow') return 'bg-yellow-100 text-yellow-700';
  if (tone === 'orange') return 'bg-orange-100 text-warning';
  return 'bg-green-light text-primary';
}

export default function VerificationStatus() {
  const { proofId } = useParams();
  const navigate = useNavigate();
  const proof = useProofStore((state) => state.getProofById(proofId || ''));
  const mission = useMissionStore((state) => state.getMissionById(proof?.missionId || 'mission-mifi') || state.missions[0]);

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-5 pb-5 pt-2 text-ink">
      <header className="grid grid-cols-[38px_1fr_38px] items-start">
        <button type="button" onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full" aria-label="Go back">
          <ArrowLeft size={25} />
        </button>
        <div className="text-center">
          <h1 className="whitespace-nowrap text-[24px] font-extrabold leading-tight">Verification Status</h1>
          <p className="mt-0.5 text-sm leading-snug text-slate-500">Track your report progress</p>
        </div>
        <span />
      </header>

      <section className="mt-4 rounded-3xl border border-green-100 bg-gradient-to-br from-green-light/45 via-white to-green-light/55 p-3 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-[60px_1fr_50px] items-center gap-3">
          <div className="relative h-[60px] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 via-lime-100 to-sky-100 shadow-sm">
            <span className="absolute bottom-2 left-2 h-2 w-11 rounded-full bg-primary/35" />
            <span className="absolute bottom-5 left-3 h-2 w-9 rounded-full bg-mission/35" />
            <Leaf size={25} className="absolute right-2 top-2 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="flex items-center gap-1.5 text-base font-extrabold leading-tight text-green-dark">
              <Leaf size={18} className="shrink-0 text-primary" />
              <span className="truncate">{mission?.title || 'Cleanup River Mifi'}</span>
            </h2>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <MapPin size={16} className="shrink-0 text-primary" />
              {mission?.city || 'Bafoussam'}, {mission?.region || 'West Region'}
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <CalendarDays size={15} className="shrink-0" />
              May 21, 2025 - 10:24 AM
            </p>
          </div>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-light">
            <span className="absolute inset-1.5 rounded-full bg-primary/15" />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_14px_rgba(22,163,74,0.24)]">
              <Leaf size={22} />
            </span>
          </div>
        </div>
      </section>

      <h2 className="mt-3 text-[19px] font-extrabold">Verification Progress</h2>

      <section className="mt-2.5 rounded-3xl border border-slate-100 bg-white px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.07)]">
        <div className="space-y-2">
          {timelineSteps.map(({ title, time, body, Icon, tone, badge }, index) => (
            <div key={title} className="grid grid-cols-[46px_1fr] gap-3">
              <div className="relative flex justify-center">
                {index < timelineSteps.length - 1 ? <span className={`absolute left-1/2 top-10 h-[44px] -translate-x-1/2 border-l-2 border-dashed ${tone === 'green' ? 'border-primary' : 'border-warning'}`} /> : null}
                <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${stepClasses(tone)}`}>
                  <Icon size={22} />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${numberClasses(tone)}`}>{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-extrabold leading-tight">{title}</h3>
                      <p className="shrink-0 text-[11px] font-semibold text-slate-500">{time.split(' - ')[1]}</p>
                    </div>
                    <p className="mt-0.5 text-[12px] font-medium text-slate-600">{time.split(' - ')[0]}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-slate-500">{body}</p>
                    {badge ? (
                      <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-xl bg-green-light px-3 py-1.5 text-xs font-extrabold text-primary">
                        {badge.includes('Map') ? <Map size={15} /> : <Leaf size={15} />}
                        {badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/map" className="flex min-h-11 items-center justify-center rounded-2xl bg-green-dark px-3 text-center text-xs font-extrabold text-white shadow-[0_8px_18px_rgba(6,78,59,0.18)]">
          View resolved marker
        </Link>
        <Link to="/leaderboard" className="flex min-h-11 items-center justify-center rounded-2xl border border-primary bg-white px-3 text-center text-xs font-extrabold text-primary">
          Check leaderboard
        </Link>
      </div>
    </main>
  );
}
