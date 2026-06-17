import { useMemo } from 'react';
import { useMissionStore } from '../store/missionStore';
import { useReportStore } from '../store/reportStore';
import { convertMissionToMarker, convertReportToMarker } from '../services/mapService';

export function useMapMarkers() {
  const reports = useReportStore((state) => state.reports);
  const missions = useMissionStore((state) => state.missions);

  return useMemo(() => [...reports.map(convertReportToMarker), ...missions.map(convertMissionToMarker)], [reports, missions]);
}
