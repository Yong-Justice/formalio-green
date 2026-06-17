import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';
import { mockChallenges } from '../data/mockChallenges';

export default function Challenges() {
  return (
    <PageContainer title="Challenges" eyebrow="Community goals">
      {mockChallenges.map((challenge) => {
        const progress = Math.min(100, Math.round((challenge.currentValue / challenge.targetValue) * 100));
        return (
          <Card key={challenge.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{challenge.title}</p>
                <p className="text-sm text-slate-500">{challenge.description}</p>
              </div>
              <span className="rounded-full bg-gold/30 px-2 py-1 text-xs font-bold text-ink">+{challenge.rewardPoints}</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">{challenge.currentValue}/{challenge.targetValue} completed</p>
          </Card>
        );
      })}
    </PageContainer>
  );
}
