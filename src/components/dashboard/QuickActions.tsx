import { Link } from 'react-router-dom';
import Card from '../common/Card';

export default function QuickActions() {
  return (
    <Card className="grid grid-cols-2 gap-3">
      <Link className="rounded-lg bg-primary px-3 py-3 text-center text-sm font-semibold text-white" to="/report">Report</Link>
      <Link className="rounded-lg bg-mission px-3 py-3 text-center text-sm font-semibold text-white" to="/map">Open map</Link>
    </Card>
  );
}
