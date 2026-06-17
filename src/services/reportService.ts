import type { EnvironmentalReport, ReportStatus } from '../types/report';
import { supabase } from './supabaseClient';

export const reportService = {
  createReport: (report: Omit<EnvironmentalReport, 'id' | 'createdAt' | 'updatedAt'>) => supabase.from('reports').insert(report),
  getReports: () => supabase.from('reports').select('*').order('created_at', { ascending: false }),
  updateReportStatus: (id: string, status: ReportStatus) => supabase.from('reports').update({ status }).eq('id', id),
};
