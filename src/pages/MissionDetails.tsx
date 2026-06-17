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
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!mission) return <PageContainer title="Mission not found" />;
  return (
    <PageContainer title="Mission Details" eyebrow={mission.city}>
      <MissionDetailsCard mission={mission} />
      <Button type="button" onClick={() => currentUser && joinMission(mission.id, currentUser.id)} className="w-full">Join mission</Button>
      <Link className="block text-center font-semibold text-primary" to={`/submit-proof/${mission.id}`}>Submit proof</Link>
    </PageContainer>
  );
}
