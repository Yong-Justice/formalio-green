import { useEcoScoreStore } from '../../store/ecoScoreStore';
import Card from '../common/Card';

export default function EcoScoreCard() {
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);
  const calculateLevel = useEcoScoreStore((state) => state.calculateLevel);
  return (
    <Card>
      <p className="text-sm text-slate-500">Eco Score</p>
      <p className="text-3xl font-bold text-primary">{ecoScore}</p>
      <p className="text-sm font-medium text-green-dark">{calculateLevel(ecoScore)}</p>
    </Card>
  );
}
