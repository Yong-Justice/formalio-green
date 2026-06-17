import type { Mission } from '../../types/mission';
import Card from '../common/Card';

export default function MissionDetailsCard({ mission }: { mission: Mission }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">{mission.title}</p>
          <p className="text-sm text-slate-500">{mission.city}, {mission.region}</p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-mission">{mission.status.replaceAll('_', ' ')}</span>
      </div>
      <p className="text-sm text-slate-600">{mission.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-slate-50 p-3"><p className="font-bold">{mission.missionDate}</p><p className="text-xs text-slate-500">Date</p></div>
        <div className="rounded-lg bg-slate-50 p-3"><p className="font-bold">{mission.missionTime}</p><p className="text-xs text-slate-500">Time</p></div>
        <div className="rounded-lg bg-slate-50 p-3"><p className="font-bold">{mission.volunteersJoined}/{mission.volunteersNeeded}</p><p className="text-xs text-slate-500">Volunteers</p></div>
        <div className="rounded-lg bg-slate-50 p-3"><p className="font-bold">{mission.ecoPointsReward}</p><p className="text-xs text-slate-500">Eco Points</p></div>
      </div>
      <p className="text-sm font-semibold text-primary">{mission.ecoPointsReward} Eco Points reward</p>
    </Card>
  );
}
