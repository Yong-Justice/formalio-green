import { useMissionStore } from '../../store/missionStore';
import { useProofStore } from '../../store/proofStore';
import { useReportStore } from '../../store/reportStore';
import Card from '../common/Card';

export default function ImpactStats() {
  const reports = useReportStore((state) => state.reports);
  const missions = useMissionStore((state) => state.missions);
  const proofs = useProofStore((state) => state.proofs);
  const volunteers = missions.reduce((total, mission) => total + mission.volunteersJoined, 0);
  const resolved = reports.filter((report) => report.status === 'resolved').length;
  const approvedProofs = proofs.filter((proof) => proof.status === 'approved').length;
  return (
    <Card className="grid grid-cols-2 gap-3 text-center">
      <div className="rounded-lg bg-slate-50 p-3"><p className="text-xl font-bold">{reports.length}</p><p className="text-xs text-slate-500">Reports</p></div>
      <div className="rounded-lg bg-slate-50 p-3"><p className="text-xl font-bold">{resolved}</p><p className="text-xs text-slate-500">Resolved</p></div>
      <div className="rounded-lg bg-slate-50 p-3"><p className="text-xl font-bold">{missions.filter((mission) => mission.status !== 'completed').length}</p><p className="text-xs text-slate-500">Active missions</p></div>
      <div className="rounded-lg bg-slate-50 p-3"><p className="text-xl font-bold">{volunteers}</p><p className="text-xs text-slate-500">Volunteers</p></div>
      <div className="rounded-lg bg-slate-50 p-3"><p className="text-xl font-bold">{approvedProofs * 35}kg</p><p className="text-xs text-slate-500">Waste demo</p></div>
      <div className="rounded-lg bg-slate-50 p-3"><p className="text-xl font-bold">{approvedProofs * 12}</p><p className="text-xs text-slate-500">Trees demo</p></div>
    </Card>
  );
}
