import Button from '../common/Button';
import Card from '../common/Card';

export default function ProofUploadForm() {
  return (
    <Card>
      <form className="space-y-3">
        <input className="w-full rounded-lg border border-slate-300 p-3" type="file" aria-label="Before photo" />
        <input className="w-full rounded-lg border border-slate-300 p-3" type="file" aria-label="After photo" />
        <textarea className="min-h-24 w-full rounded-lg border border-slate-300 p-3" placeholder="Proof notes" />
        <Button type="button" className="w-full">Submit proof draft</Button>
      </form>
    </Card>
  );
}
