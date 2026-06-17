import Card from '../common/Card';

type MapStatsCardProps = {
  reportCount: number;
  missionCount: number;
};

export default function MapStatsCard({ reportCount, missionCount }: MapStatsCardProps) {
  return (
    <Card className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-xs text-slate-500">Reports</p>
        <p className="text-xl font-bold text-ink">{reportCount}</p>
      </div>
      <div>
        <p className="text-xs text-slate-500">Missions</p>
        <p className="text-xl font-bold text-ink">{missionCount}</p>
      </div>
    </Card>
  );
}
