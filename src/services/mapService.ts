import type { MapMarker } from '../types/map';
import type { EnvironmentalReport } from '../types/report';
import type { Mission } from '../types/mission';
import { CITY_COORDINATES } from '../utils/coordinates';
import { markerColorForStatus } from '../utils/markerColors';

export function convertReportToMarker(report: EnvironmentalReport, linkedMission?: Mission): MapMarker {
  return {
    id: report.id,
    title: report.title,
    description: report.description,
    city: report.city,
    region: report.region,
    latitude: report.latitude,
    longitude: report.longitude,
    status: report.status,
    severity: report.severity,
    issueType: report.issueType,
    spotKind: report.issueType.replaceAll('_', ' '),
    reportedAt: report.createdAt,
    photoUrl: report.photoUrl,
    type: 'report',
    reportId: report.id,
    missionId: linkedMission?.id,
    ecoPointsReward: linkedMission?.ecoPointsReward,
    volunteersNeeded: linkedMission?.volunteersNeeded,
    volunteersJoined: linkedMission?.volunteersJoined,
    color: markerColorForStatus(report.status, report.severity),
  };
}

export function convertMissionToMarker(mission: Mission): MapMarker {
  return {
    id: mission.id,
    title: mission.title,
    description: mission.description,
    city: mission.city,
    region: mission.region,
    latitude: mission.latitude,
    longitude: mission.longitude,
    status: mission.status,
    spotKind: mission.category.replaceAll('_', ' '),
    reportedAt: mission.createdAt,
    type: 'mission',
    reportId: mission.reportId,
    missionId: mission.id,
    ecoPointsReward: mission.ecoPointsReward,
    volunteersNeeded: mission.volunteersNeeded,
    volunteersJoined: mission.volunteersJoined,
    color: markerColorForStatus(mission.status),
  };
}

export const getMarkerColor = markerColorForStatus;
export const focusWorld = () => ({ latitude: 4.5, longitude: 15.5 });
export const focusCameroon = () => CITY_COORDINATES.Cameroon;
export const focusBafoussam = () => CITY_COORDINATES.Bafoussam;
