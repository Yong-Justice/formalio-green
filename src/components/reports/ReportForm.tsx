import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useReportStore } from '../../store/reportStore';
import { ISSUE_TYPES } from '../../utils/constants';
import Button from '../common/Button';
import ReportSuccessModal from './ReportSuccessModal';

const reportSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  issueType: z.enum(['illegal_dumping', 'water_pollution', 'blocked_drainage', 'plastic_waste', 'flood_risk', 'deforestation', 'other']),
  severity: z.enum(['low', 'medium', 'high']),
  city: z.string().min(2),
  region: z.string().min(2),
  latitude: z.number(),
  longitude: z.number(),
  photoUrl: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportForm() {
  const [saved, setSaved] = useState(false);
  const addReport = useReportStore((state) => state.addReport);
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      city: 'Bafoussam',
      region: 'West Region',
      latitude: 5.4812,
      longitude: 10.4185,
      issueType: 'illegal_dumping',
      severity: 'high',
      title: 'Illegal dumpsite near Marche A',
      description: 'Large pile of household waste near the market entrance needs urgent cleanup.',
      photoUrl: '/images/launch-screen.png',
    },
  });

  function onSubmit(values: ReportFormValues) {
    addReport({ ...values, userId: 'user-justice' });
    setSaved(true);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <label className="block">
        <span className="mb-1 block text-sm font-bold text-ink">Title</span>
        <input className="w-full rounded-lg border border-slate-300 p-3" placeholder="Report title" {...register('title')} />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-ink">Problem type</span>
          <select className="w-full rounded-lg border border-slate-300 p-3" {...register('issueType')}>
            {ISSUE_TYPES.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-ink">Severity</span>
          <select className="w-full rounded-lg border border-slate-300 p-3" {...register('severity')}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-bold text-ink">Description</span>
        <textarea className="min-h-24 w-full rounded-lg border border-slate-300 p-3" placeholder="Description" {...register('description')} />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-ink">City</span>
          <input className="w-full rounded-lg border border-slate-300 p-3" {...register('city')} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-ink">Region</span>
          <input className="w-full rounded-lg border border-slate-300 p-3" {...register('region')} />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-ink">Latitude</span>
          <input className="w-full rounded-lg border border-slate-300 p-3" type="number" step="any" {...register('latitude', { valueAsNumber: true })} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold text-ink">Longitude</span>
          <input className="w-full rounded-lg border border-slate-300 p-3" type="number" step="any" {...register('longitude', { valueAsNumber: true })} />
        </label>
      </div>
      <label className="block rounded-lg border border-dashed border-primary bg-green-light p-4 text-center text-sm font-semibold text-green-dark">
        Photo placeholder/upload
        <input className="sr-only" type="file" accept="image/*" />
      </label>
      {Object.keys(errors).length ? <p className="text-sm text-danger">Please complete the report fields.</p> : null}
      <Button type="submit" className="w-full">Save report and create marker</Button>
      {saved ? <ReportSuccessModal /> : null}
    </form>
  );
}
