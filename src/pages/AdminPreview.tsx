import Button from '../components/common/Button';
import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';
import { useProofStore } from '../store/proofStore';

export default function AdminPreview() {
  const proofs = useProofStore((state) => state.proofs);
  const approveProof = useProofStore((state) => state.approveProof);
  const rejectProof = useProofStore((state) => state.rejectProof);

  return (
    <PageContainer title="Admin Preview" eyebrow="Demo verification">
      <Card>
        <p className="font-bold text-ink">Verification queue</p>
        <p className="mt-1 text-sm text-slate-500">Use this demo admin view to approve or reject submitted proof.</p>
      </Card>
      {proofs.length ? proofs.map((proof) => (
        <Card key={proof.id} className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">Proof for mission</p>
              <p className="text-xs text-slate-500">{proof.missionId}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{proof.status.replaceAll('_', ' ')}</span>
          </div>
          <p className="text-sm text-slate-600">{proof.notes}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="secondary" onClick={() => rejectProof(proof.id)}>Reject</Button>
            <Button type="button" onClick={() => approveProof(proof.id)}>Approve</Button>
          </div>
        </Card>
      )) : (
        <Card>
          <p className="text-sm text-slate-500">No proof submitted yet. Join a mission and submit proof to populate this queue.</p>
        </Card>
      )}
    </PageContainer>
  );
}
