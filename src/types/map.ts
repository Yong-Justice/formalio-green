import type { IssueType, ReportStatus, SeverityLevel } from './report';
import type { MissionStatus } from './mission';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MarkerStatus = ReportStatus | MissionStatus | 'achievement_zone';
export type MarkerColor = 'red' | 'orange' | 'blue' | 'green' | 'gold' | 'gray';

export type MapMarker = Coordinates & {
  id: string;
  title: string;
  description: string;
  city: string;
  region: string;
  status: MarkerStatus;
  color: MarkerColor;
  type: 'report' | 'mission' | 'achievement';
  severity?: SeverityLevel;
  issueType?: IssueType;
};
