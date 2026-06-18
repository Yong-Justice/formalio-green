import type { IssueType, SeverityLevel } from '../types/report';
import type { MissionCategory } from '../types/mission';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Formalio Green';
export const TAGLINE = 'Report. Act. Restore.';
export const DEFAULT_CITY = import.meta.env.VITE_DEFAULT_CITY || 'Bafoussam';
export const DEFAULT_REGION = import.meta.env.VITE_DEFAULT_REGION || 'West Region';

export const COLORS = {
  primaryGreen: '#16A34A',
  darkGreen: '#064E3B',
  lightGreen: '#DCFCE7',
  accentGold: '#FBBF24',
  dangerRed: '#EF4444',
  warningOrange: '#F97316',
  missionBlue: '#2563EB',
  background: '#F8FAFC',
  textDark: '#111827',
} as const;

export const ISSUE_TYPES: IssueType[] = [
  'illegal_dumping',
  'open_waste_pile',
  'missing_public_bins',
  'construction_debris',
  'water_pollution',
  'blocked_drainage',
  'plastic_waste',
  'flood_risk',
  'deforestation',
  'other',
];
export const MISSION_CATEGORIES: MissionCategory[] = ['cleanup', 'tree_planting', 'river_cleanup', 'lake_protection', 'awareness'];
export const SEVERITY_LEVELS: SeverityLevel[] = ['low', 'medium', 'high'];
