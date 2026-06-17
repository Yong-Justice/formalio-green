import type { MapMarker } from '../types/map';
import type { EnvironmentalReport } from '../types/report';
import type { Mission } from '../types/mission';
import { CITY_COORDINATES } from '../utils/coordinates';
import { markerColorForStatus } from '../utils/markerColors';

export function convertReportToMarker(report: EnvironmentalReport): MapMarker {
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
    type: 'report',
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
    type: 'mission',
    color: markerColorForStatus(mission.status),
  };
}

export const getMarkerColor = markerColorForStatus;
export const focusCameroon = () => CITY_COORDINATES.Cameroon;
export const focusBafoussam = () => CITY_COORDINATES.Bafoussam;
