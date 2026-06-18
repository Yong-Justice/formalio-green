import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProofUploadForm from '../components/missions/ProofUploadForm';

export default function SubmitProof() {
  const { missionId } = useParams();
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-5 pb-28 pt-3 text-ink">
      <header className="grid grid-cols-[44px_1fr_44px] items-start">
        <button type="button" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full" aria-label="Go back">
          <ArrowLeft size={27} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold leading-tight">Submit Proof</h1>
          <p className="mt-1 text-base leading-snug text-slate-500">Upload evidence for verification</p>
        </div>
        <span />
      </header>

      <section className="mt-5">
        <ProofUploadForm missionId={missionId || ''} />
      </section>
    </main>
  );
}
