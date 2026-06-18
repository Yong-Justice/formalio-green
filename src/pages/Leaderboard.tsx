import { Leaf, MapPin, Sprout } from 'lucide-react';
import { useMemo, useState } from 'react';
import { mockLeaderboard } from '../data/mockLeaderboard';
import { useEcoScoreStore } from '../store/ecoScoreStore';

type RankingScope = 'city' | 'region' | 'national';

const avatars: Record<string, string> = {
  Justice: '/images/leaderboard/justice.jpg',
  Sarah: '/images/leaderboard/sarah.jpg',
  Patrick: '/images/leaderboard/patrick.jpg',
  Emmanuel: '/images/leaderboard/emmanuel.jpg',
  Grace: '/images/leaderboard/grace.jpg',
};

const scopes: { label: string; value: RankingScope }[] = [
  { label: 'City', value: 'city' },
  { label: 'Region', value: 'region' },
  { label: 'National', value: 'national' },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative flex h-12 w-10 items-center justify-center">
        <span className="absolute bottom-0 left-1.5 h-5 w-3 rotate-6 rounded-b-sm bg-primary" />
        <span className="absolute bottom-0 right-1.5 h-5 w-3 -rotate-6 rounded-b-sm bg-primary" />
        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-yellow-300 bg-gold text-xl font-extrabold text-amber-900 shadow-[0_8px_18px_rgba(251,191,36,0.28)]">
          1
        </span>
      </div>
    );
  }

  return <span className={`w-[30px] text-center text-[24px] font-extrabold ${rank === 3 ? 'text-orange-600' : 'text-slate-500'}`}>{rank}</span>;
}

type LeaderboardEntry = {
  rank: number;
  name: string;
  city: string;
  ecoPoints: number;
};

function LeaderboardRow({ entry, featured = false }: { entry: LeaderboardEntry; featured?: boolean }) {
  return (
    <article
      className={`grid items-center gap-2 rounded-3xl border px-2.5 shadow-[0_8px_22px_rgba(15,23,42,0.06)] ${
        featured ? 'grid-cols-[40px_54px_minmax(0,1fr)_68px] border-green-200 bg-green-light/45 py-2.5' : 'grid-cols-[30px_46px_minmax(0,1fr)_68px] border-slate-100 bg-white py-2'
      }`}
    >
      <RankBadge rank={entry.rank} />
      <div className={`relative ${featured ? 'h-[54px] w-[54px]' : 'h-11 w-11'}`}>
        <img src={avatars[entry.name]} alt={`${entry.name} profile`} className="h-full w-full rounded-full border-[3px] border-white object-cover shadow-sm" />
        {featured ? (
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-white text-primary shadow">
            <Leaf size={19} fill="currentColor" />
          </span>
        ) : null}
      </div>
      <div className="min-w-0">
        <h2 className={`${featured ? 'text-[18px]' : 'text-[16px]'} truncate font-extrabold leading-tight text-ink`}>{entry.name}</h2>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-slate-600">
          <MapPin size={13} className="shrink-0 text-primary" />
          {entry.city}
        </p>
        <span className="mt-0.5 inline-flex max-w-full items-center gap-1 rounded-lg bg-green-light px-1.5 py-0.5 text-[9px] font-extrabold text-primary">
          <Leaf size={11} />
          Green Citizen
        </span>
      </div>
      <div className="text-right">
        <p className="whitespace-nowrap text-[10px] font-medium text-slate-500">Eco Points</p>
        <p className={`${featured ? 'text-[24px]' : 'text-[22px]'} flex items-center justify-end gap-0.5 font-extrabold leading-tight text-primary`}>
          {entry.ecoPoints.toLocaleString()}
          <Leaf size={14} className="shrink-0 text-lime-500" fill="currentColor" />
        </p>
      </div>
    </article>
  );
}

export default function Leaderboard() {
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const [scope, setScope] = useState<RankingScope>('city');
  const entries = useMemo(
    () =>
      [
        { rank: 1, name: 'Justice', city: 'Bafoussam', ecoPoints: Math.max(1200, ecoScore) },
        ...mockLeaderboard.filter((entry) => entry.name !== 'Justice'),
      ]
        .sort((a, b) => b.ecoPoints - a.ecoPoints)
        .map((entry, index) => ({ ...entry, rank: index + 1 })),
    [ecoScore],
  );
  const [leader, ...rest] = entries;

  return (
    <main className="flex-1 overflow-y-auto bg-white px-4 pb-24 pt-3 text-ink">
      <header className="text-center">
        <Leaf size={18} className="mx-auto text-primary/25" fill="currentColor" />
        <h1 className="text-[28px] font-extrabold leading-tight">Leaderboard</h1>
        <p className="mt-0.5 text-sm leading-snug text-slate-500">See how you rank among green champions.</p>
      </header>

      <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 text-center shadow-sm">
        {scopes.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setScope(item.value)}
            className={`h-9 rounded-xl text-base font-semibold ${scope === item.value ? 'bg-primary text-white shadow-[0_8px_18px_rgba(22,163,74,0.2)]' : 'text-slate-600'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-2.5 space-y-1.5">
        <LeaderboardRow entry={leader} featured />
        {rest.slice(0, 4).map((entry) => <LeaderboardRow key={entry.name} entry={entry} />)}
      </section>

      <section className="mt-2 grid grid-cols-[64px_1fr_1fr] items-center overflow-hidden rounded-3xl border border-green-200 bg-green-light/45 p-2 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
        <div className="relative h-12">
          <Sprout size={54} className="absolute bottom-0 left-1 text-primary" />
          <span className="absolute bottom-0 left-0 h-2 w-16 rounded-full bg-amber-900/25" />
        </div>
        <div className="border-r border-green-200 px-2">
          <p className="text-xs font-extrabold text-primary">Your Rank</p>
          <p className="mt-0.5 text-[21px] font-extrabold leading-none text-primary">1 of 128</p>
        </div>
        <div className="px-2">
          <p className="text-xs font-medium text-slate-600">Your Points</p>
          <p className="mt-0.5 text-[21px] font-extrabold leading-none text-primary">1,200 <span className="text-sm">Pts</span></p>
        </div>
      </section>
    </main>
  );
}
