import type { Mission } from '../../types/mission';
import Card from '../common/Card';

export default function MissionDetailsCard({ mission }: { mission: Mission }) {
  return (
    <Card className="space-y-2">
      <p className="font-semibold text-ink">{mission.title}</p>
      <p className="text-sm text-slate-600">{mission.description}</p>
      <p className="text-sm text-slate-500">{mission.missionDate} at {mission.missionTime}</p>
      <p className="text-sm font-semibold text-primary">{mission.ecoPointsReward} Eco Points reward</p>
    </Card>
  );
}
