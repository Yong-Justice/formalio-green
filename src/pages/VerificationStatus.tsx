import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';
import { useEcoScoreStore } from '../store/ecoScoreStore';
import { useProofStore } from '../store/proofStore';

export default function VerificationStatus() {
  const { proofId } = useParams();
  const proof = useProofStore((state) => state.getProofById(proofId || ''));
  const approveProof = useProofStore((state) => state.approveProof);
  const rejectProof = useProofStore((state) => state.rejectProof);
  const ecoScore = useEcoScoreStore((state) => state.ecoScore);

  if (!proof) {
    return (
      <PageContainer title="Verification Status" eyebrow="No proof found">
        <Card>
          <p className="text-sm text-slate-600">Submit a proof from a mission to start the verification flow.</p>
          <Link to="/missions" className="mt-3 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-white">Open missions</Link>
        </Card>
      </PageContainer>
    );
  }

  const steps = [
    { label: 'Pending', active: true },
    { label: 'Under review', active: proof.status === 'under_review' || proof.status === 'approved' },
    { label: 'Approved', active: proof.status === 'approved' },
  ];

  return (
    <PageContainer title="Verification Status" eyebrow={proof.status.replaceAll('_', ' ')}>
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          {proof.status === 'approved' ? <CheckCircle2 className="text-primary" /> : proof.status === 'rejected' ? <XCircle className="text-danger" /> : <Clock className="text-warning" />}
          <div>
            <p className="font-bold text-ink">Mission proof submitted</p>
            <p className="text-sm text-slate-500">Eco Score: {ecoScore}</p>
          </div>
        </div>
        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${step.active ? 'bg-primary' : 'bg-slate-200'}`} />
              <span className={step.active ? 'font-semibold text-ink' : 'text-slate-500'}>{step.label}</span>
            </div>
          ))}
        </div>
        <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{proof.notes}</p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" onClick={() => rejectProof(proof.id)}>Reject demo</Button>
        <Button type="button" onClick={() => approveProof(proof.id)}>Approve demo</Button>
      </div>

      <Link className="block rounded-lg bg-green-dark px-4 py-3 text-center font-bold text-white" to="/map">View resolved marker</Link>
      <Link className="block text-center text-sm font-semibold text-primary" to="/leaderboard">Check leaderboard</Link>
    </PageContainer>
  );
}
