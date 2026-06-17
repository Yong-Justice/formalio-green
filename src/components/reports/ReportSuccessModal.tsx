import Card from '../common/Card';
import { Link } from 'react-router-dom';

export default function ReportSuccessModal() {
  return (
    <Card className="border-primary bg-green-light text-green-dark">
      <p className="font-bold">Report saved. A new marker is ready on the Green Map.</p>
      <Link to="/map" className="mt-3 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-white">
        View marker on map
      </Link>
    </Card>
  );
}
