import EcoScoreCard from '../components/dashboard/EcoScoreCard';
import ImpactStats from '../components/dashboard/ImpactStats';
import QuickActions from '../components/dashboard/QuickActions';
import PageContainer from '../components/common/PageContainer';

export default function Home() {
  return <PageContainer title="Home Dashboard" eyebrow="Bafoussam"><EcoScoreCard /><ImpactStats /><QuickActions /></PageContainer>;
}
