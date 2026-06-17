import { useMissionStore } from '../../store/missionStore';
import { useReportStore } from '../../store/reportStore';
import Card from '../common/Card';

export default function ImpactStats() {
  const reports = useReportStore((state) => state.reports);
  const missions = useMissionStore((state) => state.missions);
  return (
    <Card className="grid grid-cols-3 gap-2 text-center">
      <div><p className="text-lg font-bold">{reports.length}</p><p className="text-xs text-slate-500">Reports</p></div>
      <div><p className="text-lg font-bold">{missions.length}</p><p className="text-xs text-slate-500">Missions</p></div>
      <div><p className="text-lg font-bold">{reports.filter((report) => report.status === 'resolved').length}</p><p className="text-xs text-slate-500">Resolved</p></div>
    </Card>
  );
}
