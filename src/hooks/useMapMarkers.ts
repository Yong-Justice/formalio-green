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
      {
        id: 'achievement-tamdja-clean',
        title: 'Tamdja Cleared Waste Zone',
        description: 'Verified cleanup area with sorted plastic and restored pedestrian access.',
        city: 'Bafoussam',
        region: 'West Region',
        latitude: 5.4685,
        longitude: 10.4324,
        status: 'achievement_zone' as const,
        type: 'achievement' as const,
        color: 'gold' as const,
        spotKind: 'verified restoration',
        reportedAt: '2026-03-24T08:00:00Z',
      },
      {
        id: 'achievement-buea-drain',
        title: 'Buea Drainage Restored',
        description: 'A previously blocked drainage corridor is now flowing after volunteer action.',
        city: 'Buea',
        region: 'Southwest Region',
        latitude: 4.1592,
        longitude: 9.2501,
        status: 'achievement_zone' as const,
        type: 'achievement' as const,
        color: 'gold' as const,
        spotKind: 'fixed drainage',
        reportedAt: '2026-03-25T08:00:00Z',
      },
      {
        id: 'achievement-ngaoundere-recycle',
        title: 'Ngaoundere Recycling Point',
        description: 'Community collection point verified and added to the green map.',
        city: 'Ngaoundere',
        region: 'Adamawa Region',
        latitude: 7.337,
        longitude: 13.5881,
        status: 'achievement_zone' as const,
        type: 'achievement' as const,
        color: 'gold' as const,
        spotKind: 'recycling point',
        reportedAt: '2026-03-26T08:00:00Z',
      },
    ],
    [reports, missions],
  );
}
