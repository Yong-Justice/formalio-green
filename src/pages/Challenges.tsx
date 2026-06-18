import { AlertTriangle, Bell, CheckCircle2, Clock3, Leaf, Recycle, Sprout, Trash2, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { mockChallenges } from '../data/mockChallenges';
import type { Challenge } from '../types/challenge';

type ChallengeTab = 'active' | 'completed';

const challengeMeta: Record<string, { Icon: typeof Leaf; joined: string; daysLeft: string; unit: string }> = {
  'challenge-city-cleanup': { Icon: Trash2, joined: '1,245 joined', daysLeft: '5 days left', unit: 'bags collected' },
  'challenge-tree-planting': { Icon: Sprout, joined: '892 joined', daysLeft: '8 days left', unit: 'trees planted' },
  'challenge-zero-waste-market': { Icon: Recycle, joined: '576 joined', daysLeft: '3 days left', unit: 'kg waste diverted' },
  'challenge-no-bin-spots': { Icon: Trash2, joined: '318 joined', daysLeft: '10 days left', unit: 'no-bin spots reported' },
  'challenge-open-pile-cleanup': { Icon: Recycle, joined: '684 joined', daysLeft: '14 days left', unit: 'waste piles cleared' },
  'challenge-rubble-safe-paths': { Icon: AlertTriangle, joined: '221 joined', daysLeft: '16 days left', unit: 'blocked paths fixed' },
  'challenge-river-rescue': { Icon: Recycle, joined: '407 joined', daysLeft: '18 days left', unit: 'river spots cleaned' },
  'challenge-school-green': { Icon: Leaf, joined: '156 joined', daysLeft: '21 days left', unit: 'school events completed' },
};

function ChallengeCard({ challenge, featured = false }: { challenge: Challenge; featured?: boolean }) {
  const progress = Math.min(100, Math.round((challenge.currentValue / challenge.targetValue) * 100));
  const meta = challengeMeta[challenge.id] || { Icon: Leaf, joined: '420 joined', daysLeft: '6 days left', unit: 'actions completed' };
  const Icon = meta.Icon;

  return (
    <article className={`relative rounded-2xl border bg-white p-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.07)] ${featured ? 'border-green-200 bg-green-light/20' : 'border-slate-100'}`}>
      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
        <Leaf size={18} />
      </span>

      <div className="grid grid-cols-[72px_1fr] gap-3">
        <div className="mt-7 flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-green-light">
          <Icon size={43} className="text-primary" />
        </div>

        <div className="min-w-0 pt-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="min-w-0 text-[18px] font-extrabold leading-tight text-ink">{challenge.title}</h2>
            <span className="shrink-0 rounded-2xl bg-green-light px-2.5 py-1.5 text-sm font-extrabold text-primary">+{challenge.rewardPoints} Pts</span>
          </div>
          <p className="mt-1.5 text-[14px] leading-snug text-slate-600">{challenge.description}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[13px] font-semibold">
            <p className="flex items-center gap-1.5 text-slate-500">
              <Users size={16} />
              {meta.joined}
            </p>
            <p className="flex items-center gap-1.5 text-primary">
              <Clock3 size={16} />
              {meta.daysLeft}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <p className="text-slate-600">
            <span className="font-extrabold text-primary">{challenge.currentValue}</span> / {challenge.targetValue.toLocaleString()} {meta.unit}
          </p>
          <p className="text-slate-600">{progress}%</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-green-light">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button type="button" className="mt-4 h-12 w-full rounded-xl bg-primary text-base font-extrabold text-white shadow-[0_10px_20px_rgba(22,163,74,0.22)]">
        Join Challenge
      </button>
    </article>
  );
}

export default function Challenges() {
  const [tab, setTab] = useState<ChallengeTab>('active');
  const visibleChallenges = useMemo(
    () => mockChallenges.filter((challenge) => (tab === 'active' ? challenge.status === 'active' : challenge.status === 'completed')),
    [tab],
  );

  return (
    <main className="flex-1 overflow-y-auto bg-white px-4 pb-28 pt-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[34px] font-extrabold leading-tight text-ink">Challenges</h1>
          <p className="mt-1 text-lg leading-snug text-slate-500">Join challenges and earn more points</p>
        </div>
        <button type="button" className="relative mt-2 flex h-12 w-12 items-center justify-center rounded-full text-ink" aria-label="Notifications">
          <Bell size={32} />
          <span className="absolute right-2 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary" />
        </button>
      </header>

      <div className="mt-6 grid grid-cols-2 rounded-2xl border border-slate-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setTab('active')}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl text-base font-bold ${tab === 'active' ? 'bg-green-light text-primary' : 'text-slate-500'}`}
        >
          <Leaf size={25} />
          Active
        </button>
        <button
          type="button"
          onClick={() => setTab('completed')}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl text-base font-bold ${tab === 'completed' ? 'bg-green-light text-primary' : 'text-slate-500'}`}
        >
          <CheckCircle2 size={25} />
          Completed
        </button>
      </div>

      <section className="mt-4 space-y-3">
        {visibleChallenges.length ? (
          visibleChallenges.map((challenge, index) => <ChallengeCard key={challenge.id} challenge={challenge} featured={index === 0} />)
        ) : (
          <div className="rounded-2xl border border-slate-100 p-8 text-center text-slate-500">No completed challenges yet.</div>
        )}
      </section>

      <section className="mb-1 mt-4 overflow-hidden rounded-2xl bg-green-dark text-white shadow-[0_14px_28px_rgba(6,78,59,0.24)]">
        <div className="grid grid-cols-[96px_1fr] items-center gap-3 p-4">
          <div className="relative flex h-20 shrink-0 items-end justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Sprout size={62} className="relative z-10 text-lime-200 drop-shadow-sm" />
            <span className="absolute bottom-3 h-3 w-16 rounded-full bg-black/20" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[20px] font-extrabold leading-tight text-white">Small actions, big impact.</h2>
            <p className="mt-1 text-[15px] font-semibold leading-snug text-white/90">
              Challenge yourself. Inspire others. Build a <span className="font-extrabold text-lime-200">greener Cameroon.</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
