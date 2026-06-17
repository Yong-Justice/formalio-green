import { Link, useParams } from 'react-router-dom';
import MissionDetailsCard from '../components/missions/MissionDetailsCard';
import Button from '../components/common/Button';
import PageContainer from '../components/common/PageContainer';
import { useAuthStore } from '../store/authStore';
import { useMissionStore } from '../store/missionStore';

export default function MissionDetails() {
  const { id } = useParams();
  const mission = useMissionStore((state) => state.getMissionById(id || ''));
  const joinMission = useMissionStore((state) => state.joinMission);
  const hasJoinedMission = useMissionStore((state) => state.hasJoinedMission);
  const currentUser = useAuthStore((state) => state.currentUser);
  const hasJoined = currentUser ? hasJoinedMission(id || '', currentUser.id) : false;

  if (!mission) return <PageContainer title="Mission not found" />;
  return (
    <PageContainer title="Mission Details" eyebrow={mission.city}>
      <MissionDetailsCard mission={mission} />
      <Button type="button" onClick={() => currentUser && joinMission(mission.id, currentUser.id)} className="w-full" variant={hasJoined ? 'secondary' : 'primary'}>
        {hasJoined ? 'Joined mission' : 'Join mission'}
      </Button>
      <Link className="block rounded-lg border border-primary px-4 py-3 text-center font-semibold text-primary" to={`/submit-proof/${mission.id}`}>Submit before/after proof</Link>
      {mission.reportId ? <Link className="block text-center text-sm font-semibold text-mission" to="/map">View linked marker on map</Link> : null}
    </PageContainer>
  );
}
