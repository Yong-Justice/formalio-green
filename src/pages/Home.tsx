import { Bell, CheckCircle2, ClipboardList, Flag, Map, MapPin, Sprout, UploadCloud, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEcoScoreStore } from '../store/ecoScoreStore';
import { useMissionStore } from '../store/missionStore';
import { useReportStore } from '../store/reportStore';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const user = useAuthStore((state) => state.currentUser);
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const calculateLevel = useEcoScoreStore((state) => state.calculateLevel);
  const transactions = useEcoScoreStore((state) => state.transactions);
  const reports = useReportStore((state) => state.reports);
  const missions = useMissionStore((state) => state.missions);
  const resolved = reports.filter((report) => report.status === 'resolved').length;
  const volunteers = missions.reduce((total, mission) => total + mission.volunteersJoined, 0);

  const actions = [
    { label: 'Report Problem', to: '/report', icon: Flag, colors: 'border-violet-100 bg-violet-50 text-violet-700' },
    { label: 'View Green Map', to: '/map', icon: Map, colors: 'border-green-100 bg-green-50 text-primary' },
    { label: 'Join Mission', to: '/missions', icon: Users, colors: 'border-orange-100 bg-orange-50 text-orange-600' },
    { label: 'Submit Proof', to: missions[0] ? `/submit-proof/${missions[0].id}` : '/missions', icon: UploadCloud, colors: 'border-blue-100 bg-blue-50 text-mission' },
  ];

  const stats = [
    { label: 'Reports', value: reports.length, icon: ClipboardList },
    { label: 'Resolved', value: resolved, icon: CheckCircle2 },
    { label: 'Missions', value: missions.length, icon: Flag },
    { label: 'Volunteers', value: volunteers, icon: Users },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-white px-5 pb-5 pt-6 text-ink">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold leading-tight">Hello, {user?.fullName || 'Justice'}! <span aria-hidden="true">👋</span></h1>
          <p className="mt-3 flex items-center gap-2 text-base font-bold">
            <MapPin className="text-primary" size={21} fill="currentColor" />
            {user?.city || 'Bafoussam'}, {user?.region || 'West Region'}
          </p>
        </div>
        <button className="relative mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm" type="button" aria-label="Notifications">
          <Bell size={28} />
          <span className="absolute right-2 top-1 h-3 w-3 rounded-full border-2 border-white bg-primary" />
        </button>
      </header>

      <section className="mt-7 rounded-[22px] border border-green-200 bg-gradient-to-br from-green-light/60 via-white to-green-light/80 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-extrabold text-green-dark">Eco Score</p>
            <p className="mt-4 text-[58px] font-extrabold leading-none text-primary">{ecoScore}</p>
            <p className="mt-3 text-base font-semibold text-slate-600">Good job! Keep it up.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/70 shadow-inner">
              <img src="/logo.png" alt="" className="h-20 w-20 rounded-full object-cover" />
              <Sprout className="absolute -bottom-1 left-2 text-primary" size={28} />
            </div>
            <p className="mt-2 text-sm font-bold text-slate-600">Level {Math.max(1, Math.floor(ecoScore / 250))}</p>
            <p className="text-sm font-extrabold text-green-dark">{calculateLevel(ecoScore)}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4">
        {actions.map(({ label, to, icon: Icon, colors }) => (
          <Link key={to} to={to} className={`flex min-h-[104px] items-center gap-4 rounded-[18px] border p-4 shadow-sm ${colors}`}>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/65">
              <Icon size={31} fill="currentColor" />
            </span>
            <span className="text-xl font-extrabold leading-tight text-ink">{label}</span>
          </Link>
        ))}
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">Today's Impact</h2>
          <Link to="/map" className="text-base font-bold text-primary">View all</Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-sm">
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-extrabold text-primary">{value}</p>
              <span className="mx-auto mt-3 flex h-9 w-9 items-center justify-center rounded-xl bg-green-light text-primary">
                <Icon size={20} fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-[18px] bg-green-dark text-white shadow-sm">
        <div className="flex items-center gap-4 bg-[radial-gradient(circle_at_20%_30%,rgba(132,204,22,0.45),transparent_32%),linear-gradient(90deg,#064E3B,#00351f)] p-4">
          <img src="/images/launch-screen.png" alt="" className="h-24 w-28 rounded-2xl object-cover object-bottom" />
          <div>
            <p className="text-lg font-extrabold">Every action counts.</p>
            <p className="mt-2 text-base leading-snug text-green-light">Together, we build a <span className="font-bold text-lime-300">cleaner, greener</span> Cameroon.</p>
          </div>
        </div>
      </section>

      {transactions.length ? (
        <section className="mt-5 space-y-2">
          {transactions.slice(0, 2).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm">
              <span className="text-slate-700">{activity.description}</span>
              <span className="font-bold text-primary">+{activity.points}</span>
            </div>
          ))}
        </section>
      ) : null}
    </main>
  );
}
