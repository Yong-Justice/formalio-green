import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useProofStore } from '../../store/proofStore';
import Button from '../common/Button';
import Card from '../common/Card';

type ProofUploadFormProps = {
  missionId: string;
};

export default function ProofUploadForm({ missionId }: ProofUploadFormProps) {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const submitProof = useProofStore((state) => state.submitProof);
  const [notes, setNotes] = useState('Before and after cleanup proof submitted for verification.');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser) return;
    const proof = submitProof({
      missionId,
      userId: currentUser.id,
      beforePhotoUrl: '/images/login-screen.png',
      afterPhotoUrl: '/images/onboarding-screen.png',
      notes,
      latitude: 5.4812,
      longitude: 10.4185,
    });
    navigate(`/verification/${proof.id}`);
  }

  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className="rounded-lg border border-dashed border-primary bg-green-light p-4 text-center text-sm font-bold text-green-dark">
            Before photo
            <input className="sr-only" type="file" accept="image/*" />
          </label>
          <label className="rounded-lg border border-dashed border-primary bg-green-light p-4 text-center text-sm font-bold text-green-dark">
            After photo
            <input className="sr-only" type="file" accept="image/*" />
          </label>
        </div>
        <textarea
          className="min-h-28 w-full rounded-lg border border-slate-300 p-3"
          placeholder="Proof notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <input className="rounded-lg border border-slate-300 p-3" value="5.4812" readOnly aria-label="Latitude" />
          <input className="rounded-lg border border-slate-300 p-3" value="10.4185" readOnly aria-label="Longitude" />
        </div>
        <Button type="submit" className="w-full">Submit proof for verification</Button>
      </form>
    </Card>
  );
}
