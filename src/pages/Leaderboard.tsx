import LeaderboardCard from '../components/leaderboard/LeaderboardCard';
import RankingTabs from '../components/leaderboard/RankingTabs';
import PageContainer from '../components/common/PageContainer';
import { mockLeaderboard } from '../data/mockLeaderboard';
import { useEcoScoreStore } from '../store/ecoScoreStore';

export default function Leaderboard() {
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const entries = [
    { rank: 1, name: 'Justice', city: 'Bafoussam', ecoPoints: ecoScore },
    ...mockLeaderboard.filter((entry) => entry.name !== 'Justice'),
  ]
    .sort((a, b) => b.ecoPoints - a.ecoPoints)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  return <PageContainer title="Leaderboard" eyebrow="Eco Points"><RankingTabs />{entries.map((entry) => <LeaderboardCard key={entry.name} entry={entry} />)}</PageContainer>;
}
