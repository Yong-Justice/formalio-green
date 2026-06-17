import type { MarkerColor, MarkerStatus } from '../types/map';
import type { SeverityLevel } from '../types/report';

export function markerColorForStatus(status: MarkerStatus, severity?: SeverityLevel): MarkerColor {
  if (status === 'resolved' || status === 'completed') return 'green';
  if (status === 'active' || status === 'in_progress' || status === 'mission_created') return 'blue';
  if (status === 'achievement_zone') return 'gold';
  if (severity === 'high') return 'red';
  if (severity === 'medium') return 'orange';
  return 'gray';
}

export function markerHex(color: MarkerColor) {
  return {
    red: '#EF4444',
    orange: '#F97316',
    blue: '#2563EB',
    green: '#16A34A',
    gold: '#FBBF24',
    gray: '#64748B',
  }[color];
}
