import { create } from 'zustand';
import { mockReports } from '../data/mockReports';
import type { EnvironmentalReport, ReportStatus } from '../types/report';

type ReportState = {
  reports: EnvironmentalReport[];
  addReport: (report: Omit<EnvironmentalReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => EnvironmentalReport;
  updateReportStatus: (id: string, status: ReportStatus) => void;
  getReportsByCity: (city: string) => EnvironmentalReport[];
  getReportById: (id: string) => EnvironmentalReport | undefined;
};

export const useReportStore = create<ReportState>((set, get) => ({
  reports: mockReports,
  addReport: (report) => {
    const newReport: EnvironmentalReport = {
      ...report,
      id: crypto.randomUUID(),
      status: 'reported',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ reports: [newReport, ...state.reports] }));
    return newReport;
  },
  updateReportStatus: (id, status) =>
    set((state) => ({
      reports: state.reports.map((report) => (report.id === id ? { ...report, status, updatedAt: new Date().toISOString() } : report)),
    })),
  getReportsByCity: (city) => get().reports.filter((report) => report.city === city),
  getReportById: (id) => get().reports.find((report) => report.id === id),
}));
