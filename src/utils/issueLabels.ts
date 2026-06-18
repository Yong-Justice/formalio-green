import type { IssueType } from '../types/report';

export const issueTypeLabels: Record<IssueType, string> = {
  illegal_dumping: 'Illegal Dumping',
  open_waste_pile: 'Open Waste Pile',
  missing_public_bins: 'No Public Bin',
  construction_debris: 'Construction Debris',
  water_pollution: 'Water Pollution',
  blocked_drainage: 'Blocked Drainage',
  plastic_waste: 'Plastic Waste',
  flood_risk: 'Flood Risk',
  deforestation: 'Deforestation',
  other: 'Other Issue',
};

export function issueTypeLabel(issueType: IssueType) {
  return issueTypeLabels[issueType];
}
