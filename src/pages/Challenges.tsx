import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';
import { mockChallenges } from '../data/mockChallenges';

export default function Challenges() {
  return <PageContainer title="Challenges" eyebrow="Community goals">{mockChallenges.map((challenge) => <Card key={challenge.id}><p className="font-semibold">{challenge.title}</p><p className="text-sm text-slate-500">{challenge.currentValue}/{challenge.targetValue}</p></Card>)}</PageContainer>;
}
