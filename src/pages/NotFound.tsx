import { Link } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

export default function NotFound() {
  return <PageContainer title="Page not found"><Link className="font-semibold text-primary" to="/home">Return home</Link></PageContainer>;
}
