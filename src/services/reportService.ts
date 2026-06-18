import type { EnvironmentalReport, ReportStatus } from '../types/report';
import { supabase } from './supabaseClient';

type ReportRow = {
  id: string;
  user_id: string;
  title: string;
  issue_type: EnvironmentalReport['issueType'];
  description: string;
  severity: EnvironmentalReport['severity'];
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  photo_url?: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
};

function toReport(row: ReportRow): EnvironmentalReport {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    issueType: row.issue_type,
    description: row.description,
    severity: row.severity,
    city: row.city,
    region: row.region,
    latitude: row.latitude,
    longitude: row.longitude,
    photoUrl: row.photo_url,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toReportInsert(report: Omit<EnvironmentalReport, 'id' | 'createdAt' | 'updatedAt'>) {
  return {
    user_id: report.userId,
    title: report.title,
    issue_type: report.issueType,
    description: report.description,
    severity: report.severity,
    city: report.city,
    region: report.region,
    latitude: report.latitude,
    longitude: report.longitude,
    photo_url: report.photoUrl,
    status: report.status,
  };
}

export const reportService = {
  async createReport(report: Omit<EnvironmentalReport, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase.from('reports').insert(toReportInsert(report)).select('*').single<ReportRow>();
    return { data: data ? toReport(data) : null, error };
  },
  async getReports() {
    const { data, error } = await supabase.from('reports').select('*').order('created_at', { ascending: false }).returns<ReportRow[]>();
    return { data: data?.map(toReport) ?? null, error };
  },
  async updateReportStatus(id: string, status: ReportStatus) {
    const { data, error } = await supabase.from('reports').update({ status, updated_at: new Date().toISOString() }).eq('id', id).select('*').single<ReportRow>();
    return { data: data ? toReport(data) : null, error };
  },
};
