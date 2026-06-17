import type { Mission } from '../../types/mission';
import MissionCard from './MissionCard';

export default function MissionList({ missions }: { missions: Mission[] }) {
  return <div className="space-y-3">{missions.map((mission) => <MissionCard key={mission.id} mission={mission} />)}</div>;
}
