import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';
import { useAuthStore } from '../store/authStore';
import { useEcoScoreStore } from '../store/ecoScoreStore';

export default function Profile() {
  const user = useAuthStore((state) => state.currentUser);
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const calculateLevel = useEcoScoreStore((state) => state.calculateLevel);
  const transactions = useEcoScoreStore((state) => state.transactions);
  return (
    <PageContainer title="Profile" eyebrow="Citizen account">
      <Card className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-light text-2xl font-extrabold text-primary">
          {user?.fullName.slice(0, 1)}
        </div>
        <p className="mt-3 text-xl font-bold">{user?.fullName}</p>
        <p className="text-sm text-slate-500">{user?.city}, {user?.region}</p>
        <p className="mt-3 text-2xl font-extrabold text-primary">{ecoScore} Eco Points</p>
        <p className="font-semibold text-green-dark">{calculateLevel(ecoScore)}</p>
      </Card>
      <Card>
        <p className="mb-3 font-bold">Badges</p>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          {['First Report', 'Cleanup Starter', 'Green Champion'].map((badge) => <span key={badge} className="rounded-lg bg-green-light p-3 text-green-dark">{badge}</span>)}
        </div>
      </Card>
      <Card>
        <p className="mb-3 font-bold">Point history</p>
        <div className="space-y-2 text-sm">
          {transactions.length ? transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between rounded-lg bg-slate-50 p-3">
              <span>{transaction.description}</span>
              <span className="font-bold text-primary">+{transaction.points}</span>
            </div>
          )) : <p className="text-slate-500">Complete the demo flow to generate point history.</p>}
        </div>
      </Card>
    </PageContainer>
  );
}
