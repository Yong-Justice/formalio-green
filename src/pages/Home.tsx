import EcoScoreCard from '../components/dashboard/EcoScoreCard';
import ImpactStats from '../components/dashboard/ImpactStats';
import QuickActions from '../components/dashboard/QuickActions';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import { useEcoScoreStore } from '../store/ecoScoreStore';

export default function Home() {
  const transactions = useEcoScoreStore((state) => state.transactions);
  return (
    <PageContainer title="Home Dashboard" eyebrow="Bafoussam">
      <EcoScoreCard />
      <QuickActions />
      <ImpactStats />
      <Card>
        <p className="mb-3 font-bold text-ink">Recent activity</p>
        <div className="space-y-3 text-sm">
          {(transactions.length ? transactions : [
            { id: 'seed-1', description: 'Cleanup River Mifi joined', points: 10, createdAt: new Date().toISOString(), userId: 'user-justice', sourceType: 'mission' },
            { id: 'seed-2', description: 'Illegal dumpsite report reviewed', points: 20, createdAt: new Date().toISOString(), userId: 'user-justice', sourceType: 'report' },
            { id: 'seed-3', description: 'Bafoussam City Cleanup progress', points: 50, createdAt: new Date().toISOString(), userId: 'user-justice', sourceType: 'challenge' },
          ]).slice(0, 4).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-slate-700">{activity.description}</span>
              <span className="font-bold text-primary">+{activity.points}</span>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
