import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';

export default function VerificationStatus() {
  const { proofId } = useParams();
  return <PageContainer title="Verification Status" eyebrow={`Proof ${proofId || ''}`}><Card>Pending to under review to approved to completed</Card></PageContainer>;
}
