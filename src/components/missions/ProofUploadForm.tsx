import { Camera, CheckCircle2, FileImage, LocateFixed, MapPin, MessageSquareText, UploadCloud } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useAuthStore } from '../../store/authStore';
import { useMissionStore } from '../../store/missionStore';
import { useProofStore } from '../../store/proofStore';

type ProofUploadFormProps = {
  missionId: string;
};

export default function ProofUploadForm({ missionId }: ProofUploadFormProps) {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const mission = useMissionStore((state) => state.getMissionById(missionId));
  const submitProof = useProofStore((state) => state.submitProof);
  const { coordinates } = useGeolocation();
  const [notes, setNotes] = useState('Cleanup completed. Waste was collected, sorted, and the area is now safe for residents.');
  const [beforePhoto, setBeforePhoto] = useState('');
  const [afterPhoto, setAfterPhoto] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser) return;

    const proof = submitProof({
      missionId,
      userId: currentUser.id,
      beforePhotoUrl: beforePhoto ? '/images/login-screen.png' : '/images/login-screen.png',
      afterPhotoUrl: afterPhoto ? '/images/onboarding-screen.png' : '/images/onboarding-screen.png',
      notes,
      latitude: coordinates?.latitude ?? mission?.latitude ?? 5.4812,
      longitude: coordinates?.longitude ?? mission?.longitude ?? 10.4185,
    });

    navigate(`/verification/${proof.id}`);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <section className="rounded-3xl border border-green-100 bg-green-light/35 p-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <CheckCircle2 size={23} />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold leading-tight text-ink">{mission?.title || 'Mission Proof'}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-600">
              <MapPin size={16} className="text-primary" />
              {mission?.city || 'Bafoussam'}, {mission?.region || 'West Region'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-base font-extrabold text-ink">Upload Proof Photos</h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex min-h-[108px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-white p-3 text-center shadow-sm">
            <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-green-light text-primary">
              <Camera size={22} />
            </span>
            <span className="text-sm font-extrabold text-ink">{beforePhoto || 'Before Photo'}</span>
            <span className="mt-1 text-xs font-semibold text-slate-500">Add original state</span>
            <input className="sr-only" type="file" accept="image/*" onChange={(event) => setBeforePhoto(event.target.files?.[0]?.name || '')} />
          </label>
          <label className="flex min-h-[108px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-white p-3 text-center shadow-sm">
            <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-green-light text-primary">
              <FileImage size={22} />
            </span>
            <span className="text-sm font-extrabold text-ink">{afterPhoto || 'After Photo'}</span>
            <span className="mt-1 text-xs font-semibold text-slate-500">Show the impact</span>
            <input className="sr-only" type="file" accept="image/*" onChange={(event) => setAfterPhoto(event.target.files?.[0]?.name || '')} />
          </label>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-base font-extrabold text-ink">GPS Location</h2>
        <div className="flex min-h-14 items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 shadow-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-light text-primary">
            <LocateFixed size={23} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-ink">{mission?.city || 'Bafoussam'}, {mission?.region || 'West Region'}</p>
            <p className="text-xs font-medium text-slate-500">{coordinates ? 'GPS auto-detected' : 'Auto-filled from mission GPS'}</p>
          </div>
          <span className="rounded-full bg-green-light px-2.5 py-1 text-[11px] font-extrabold text-primary">AUTO</span>
        </div>
      </section>

      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-base font-extrabold text-ink">
          <MessageSquareText size={20} className="text-primary" />
          Notes
        </span>
        <textarea
          className="h-24 w-full resize-none rounded-3xl border border-slate-200 bg-white px-4 py-3 text-base leading-snug text-ink shadow-sm outline-none placeholder:text-slate-400 focus:border-primary"
          placeholder="Describe what was cleaned or restored..."
          value={notes}
          onChange={(event) => setNotes(event.target.value.slice(0, 500))}
          maxLength={500}
        />
        <span className="mt-1 block text-right text-xs font-semibold text-slate-400">{notes.length}/500</span>
      </label>

      <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-extrabold text-white shadow-[0_12px_24px_rgba(22,163,74,0.25)]">
        <UploadCloud size={22} />
        Submit for Verification
      </button>
    </form>
  );
}
