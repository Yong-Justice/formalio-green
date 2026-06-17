import { Link } from 'react-router-dom';
import type { Mission } from '../../types/mission';
import Card from '../common/Card';

export default function MissionCard({ mission }: { mission: Mission }) {
  return (
    <Card>
      <Link to={`/missions/${mission.id}`} className="space-y-2">
        <p className="font-semibold text-ink">{mission.title}</p>
        <p className="text-sm text-slate-600">{mission.city} • {mission.volunteersJoined}/{mission.volunteersNeeded} joined</p>
        <p className="text-sm font-semibold text-primary">{mission.ecoPointsReward} Eco Points</p>
      </Link>
    </Card>
  );
}
