import { mockMissions } from './mockMissions';
import { mockReports } from './mockReports';
import { convertMissionToMarker, convertReportToMarker } from '../services/mapService';

export const mockMapMarkers = [
  ...mockReports.map(convertReportToMarker),
  ...mockMissions.map(convertMissionToMarker),
  {
    id: 'achievement-bafoussam-core',
    title: 'Bafoussam Green Progress Zone',
    description: 'Community achievement zone for repeated cleanup activity.',
    city: 'Bafoussam',
    region: 'West Region',
    latitude: 5.4778,
    longitude: 10.4176,
    status: 'achievement_zone',
    type: 'achievement',
    color: 'gold',
  },
] as const;
