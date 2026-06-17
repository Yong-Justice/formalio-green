export type IssueType = 'illegal_dumping' | 'water_pollution' | 'blocked_drainage' | 'plastic_waste' | 'flood_risk' | 'deforestation' | 'other';
export type SeverityLevel = 'low' | 'medium' | 'high';
export type ReportStatus = 'reported' | 'under_review' | 'mission_created' | 'resolved' | 'rejected';

export type EnvironmentalReport = {
  id: string;
  userId: string;
  title: string;
  issueType: IssueType;
  description: string;
  severity: SeverityLevel;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};
