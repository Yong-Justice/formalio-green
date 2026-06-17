import LeaderboardCard from '../components/leaderboard/LeaderboardCard';
import RankingTabs from '../components/leaderboard/RankingTabs';
import PageContainer from '../components/common/PageContainer';
import { mockLeaderboard } from '../data/mockLeaderboard';

export default function Leaderboard() {
  return <PageContainer title="Leaderboard" eyebrow="Eco Points"><RankingTabs />{mockLeaderboard.map((entry) => <LeaderboardCard key={entry.rank} entry={entry} />)}</PageContainer>;
}
