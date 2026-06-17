import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useReportStore } from '../../store/reportStore';
import Button from '../common/Button';
import ReportSuccessModal from './ReportSuccessModal';

const reportSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  issueType: z.enum(['illegal_dumping', 'water_pollution', 'blocked_drainage', 'plastic_waste', 'deforestation']),
  severity: z.enum(['low', 'medium', 'high']),
  city: z.string().min(2),
  region: z.string().min(2),
  latitude: z.number(),
  longitude: z.number(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportForm() {
  const [saved, setSaved] = useState(false);
  const addReport = useReportStore((state) => state.addReport);
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: { city: 'Bafoussam', region: 'West Region', latitude: 5.4778, longitude: 10.4176, issueType: 'illegal_dumping', severity: 'high' },
  });

  function onSubmit(values: ReportFormValues) {
    addReport({ ...values, userId: 'user-justice' });
    setSaved(true);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <input className="w-full rounded-lg border border-slate-300 p-3" placeholder="Report title" {...register('title')} />
      <select className="w-full rounded-lg border border-slate-300 p-3" {...register('issueType')}>
        <option value="illegal_dumping">Illegal dumping</option>
        <option value="water_pollution">Water pollution</option>
        <option value="blocked_drainage">Blocked drainage</option>
        <option value="plastic_waste">Plastic waste</option>
        <option value="deforestation">Deforestation</option>
      </select>
      <select className="w-full rounded-lg border border-slate-300 p-3" {...register('severity')}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <textarea className="min-h-24 w-full rounded-lg border border-slate-300 p-3" placeholder="Description" {...register('description')} />
      <div className="grid grid-cols-2 gap-2">
        <input className="rounded-lg border border-slate-300 p-3" {...register('city')} />
        <input className="rounded-lg border border-slate-300 p-3" {...register('region')} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input className="rounded-lg border border-slate-300 p-3" type="number" step="any" {...register('latitude', { valueAsNumber: true })} />
        <input className="rounded-lg border border-slate-300 p-3" type="number" step="any" {...register('longitude', { valueAsNumber: true })} />
      </div>
      {Object.keys(errors).length ? <p className="text-sm text-danger">Please complete the report fields.</p> : null}
      <Button type="submit" className="w-full">Save report</Button>
      {saved ? <ReportSuccessModal /> : null}
    </form>
  );
}
