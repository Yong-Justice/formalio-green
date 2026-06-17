import { useMemo } from 'react';
import { useMissionStore } from '../store/missionStore';
import { useReportStore } from '../store/reportStore';
import { convertMissionToMarker, convertReportToMarker } from '../services/mapService';

export function useMapMarkers() {
  const reports = useReportStore((state) => state.reports);
  const missions = useMissionStore((state) => state.missions);

  return useMemo(
    () => [
      ...reports.map((report) => convertReportToMarker(report, missions.find((mission) => mission.reportId === report.id))),
      ...missions.map(convertMissionToMarker),
      {
        id: 'achievement-dschang-tree-zone',
        title: 'Tree Planting Zone Dschang',
        description: 'Community planting area with verified restoration activity.',
        city: 'Dschang',
        region: 'West Region',
        latitude: 5.4456,
        longitude: 10.0677,
        status: 'achievement_zone' as const,
        type: 'achievement' as const,
        color: 'gold' as const,
      },
    ],
    [reports, missions],
  );
}
