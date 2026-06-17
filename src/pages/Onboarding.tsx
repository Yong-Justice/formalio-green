import { Link } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

export default function Onboarding() {
  return <PageContainer title="Report local issues. Join missions. Restore communities."><Link className="font-semibold text-primary" to="/login">Go to login</Link></PageContainer>;
}
