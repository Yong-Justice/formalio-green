import Card from '../common/Card';

type LeaderboardEntry = {
  rank: number;
  name: string;
  city: string;
  ecoPoints: number;
};

export default function LeaderboardCard({ entry }: { entry: LeaderboardEntry }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-ink">{entry.rank}. {entry.name}</p>
        <p className="text-sm text-slate-500">{entry.city}</p>
      </div>
      <p className="font-bold text-primary">{entry.ecoPoints}</p>
    </Card>
  );
}
