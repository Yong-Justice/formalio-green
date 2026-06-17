import { useParams } from 'react-router-dom';
import ProofUploadForm from '../components/missions/ProofUploadForm';
import PageContainer from '../components/common/PageContainer';

export default function SubmitProof() {
  const { missionId } = useParams();
  return <PageContainer title="Submit Proof" eyebrow="Before and after"><ProofUploadForm missionId={missionId || ''} /></PageContainer>;
}
