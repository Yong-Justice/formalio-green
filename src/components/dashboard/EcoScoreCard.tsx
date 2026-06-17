import { useEcoScoreStore } from '../../store/ecoScoreStore';
import Card from '../common/Card';

export default function EcoScoreCard() {
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const calculateLevel = useEcoScoreStore((state) => state.calculateLevel);
  const nextMilestone = ecoScore < 700 ? 700 : ecoScore < 1200 ? 1200 : ecoScore < 2000 ? 2000 : 2500;
  const progress = Math.min(100, Math.round((ecoScore / nextMilestone) * 100));
  return (
    <Card className="bg-gradient-to-br from-green-dark to-primary text-white">
      <p className="text-sm text-green-light">Eco Score</p>
      <div className="mt-1 flex items-end justify-between">
        <p className="text-4xl font-extrabold">{ecoScore}</p>
        <p className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{calculateLevel(ecoScore)}</p>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/20">
        <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-xs text-green-light">{nextMilestone - ecoScore > 0 ? `${nextMilestone - ecoScore} pts to next level` : 'Top level momentum'}</p>
    </Card>
  );
}
