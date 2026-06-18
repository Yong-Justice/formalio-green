import { ArrowLeft, Camera, ChevronDown, LocateFixed, MapPin } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportSuccessModal from '../components/reports/ReportSuccessModal';
import { useAuthStore } from '../store/authStore';
import { useReportStore } from '../store/reportStore';
import type { IssueType, SeverityLevel } from '../types/report';
import { ISSUE_TYPES } from '../utils/constants';
import { statusLabel } from '../utils/statusLabels';

const issueLabels: Record<IssueType, string> = {
  illegal_dumping: 'Illegal Dumping',
  water_pollution: 'Water Pollution',
  blocked_drainage: 'Blocked Drainage',
  plastic_waste: 'Plastic Waste',
  flood_risk: 'Flood Risk',
  deforestation: 'Deforestation',
  other: 'Other Issue',
};

const severityOptions: SeverityLevel[] = ['low', 'medium', 'high'];

export default function ReportProblem() {
  const navigate = useNavigate();
  const addReport = useReportStore((state) => state.addReport);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [issueType, setIssueType] = useState<IssueType | ''>('');
  const [severity, setSeverity] = useState<SeverityLevel>('high');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedIssue = issueType || 'illegal_dumping';
    const cleanDescription = description.trim() || 'Environmental issue reported from Bafoussam for review.';

    addReport({
      userId: currentUser?.id || 'user-justice',
      title: `${issueLabels[selectedIssue]} in Bafoussam`,
      issueType: selectedIssue,
      description: cleanDescription,
      severity,
      city: 'Bafoussam',
      region: 'West Region',
      latitude: 5.4812,
      longitude: 10.4185,
      photoUrl: fileName ? '/images/launch-screen.png' : undefined,
    });
    setSaved(true);
  }

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-5 pb-7 pt-3 text-ink">
      <header className="grid grid-cols-[44px_1fr_44px] items-start">
        <button type="button" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full" aria-label="Go back">
          <ArrowLeft size={26} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold leading-tight">Report an Issue</h1>
          <p className="mt-1 text-base leading-snug text-slate-500">Help us keep our environment clean</p>
        </div>
        <span />
      </header>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1.5 block text-base font-extrabold">Issue Type</span>
          <span className="relative block">
            <select
              value={issueType}
              onChange={(event) => setIssueType(event.target.value as IssueType | '')}
              className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 pr-12 text-base text-slate-500 outline-none shadow-sm focus:border-primary"
              aria-label="Select issue type"
            >
              <option value="">Select issue type</option>
              {ISSUE_TYPES.map((type) => <option key={type} value={type}>{issueLabels[type]}</option>)}
            </select>
            <ChevronDown size={28} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink" />
          </span>
        </label>

        <section>
          <h2 className="mb-1.5 text-base font-extrabold">Location</h2>
          <div className="flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-light text-primary">
              <MapPin size={25} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-extrabold">Bafoussam, West Region</p>
              <p className="text-sm text-slate-500">GPS auto-detected</p>
            </div>
            <LocateFixed size={27} className="text-ink" />
          </div>
        </section>

        <section>
          <h2 className="mb-1.5 text-base font-extrabold">Severity Level</h2>
          <div className="grid h-12 grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {severityOptions.map((option) => {
              const selected = severity === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSeverity(option)}
                  className={`border-r border-slate-200 text-base font-semibold last:border-r-0 ${
                    selected ? (option === 'high' ? 'bg-danger text-white' : 'bg-primary text-white') : 'bg-white text-ink'
                  }`}
                >
                  {statusLabel(option)}
                </button>
              );
            })}
          </div>
        </section>

        <label className="block">
          <span className="mb-1.5 block text-base font-extrabold">Description</span>
          <span className="relative block">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value.slice(0, 500))}
              placeholder="Describe the issue..."
              className="h-20 w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base outline-none shadow-sm placeholder:text-slate-400 focus:border-primary"
              maxLength={500}
            />
            <span className="absolute bottom-2.5 right-5 text-sm text-slate-500">{description.length}/500</span>
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-base font-extrabold">Upload Photo</span>
          <span className="flex h-20 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white text-center">
            <span className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
              <Camera size={24} />
            </span>
            <span className="text-sm font-medium text-slate-700">{fileName || 'Add a photo (optional)'}</span>
            <span className="text-xs text-slate-500">JPG, PNG up to 5MB</span>
            <input
              className="sr-only"
              type="file"
              accept="image/png,image/jpeg"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
            />
          </span>
        </label>

        <button type="submit" className="h-12 w-full rounded-2xl bg-primary text-lg font-extrabold text-white shadow-[0_12px_22px_rgba(22,163,74,0.25)]">
          Submit Report
        </button>
      </form>

      {saved ? <div className="mt-4"><ReportSuccessModal /></div> : null}
    </main>
  );
}
