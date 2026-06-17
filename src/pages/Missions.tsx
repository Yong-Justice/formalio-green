import MissionList from '../components/missions/MissionList';
import PageContainer from '../components/common/PageContainer';
import { useMissionStore } from '../store/missionStore';

export default function Missions() {
  const missions = useMissionStore((state) => state.missions);
  return <PageContainer title="Missions" eyebrow="Join action"><MissionList missions={missions} /></PageContainer>;
}
