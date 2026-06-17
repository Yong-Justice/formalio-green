import { create } from 'zustand';
import type { MissionProof, ProofStatus } from '../types/proof';
import { useEcoScoreStore } from './ecoScoreStore';
import { useMissionStore } from './missionStore';
import { useReportStore } from './reportStore';

type ProofDraft = Pick<MissionProof, 'missionId' | 'userId' | 'notes' | 'latitude' | 'longitude'> & {
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
};

type ProofState = {
  proofs: MissionProof[];
  submitProof: (proof: ProofDraft) => MissionProof;
  updateProofStatus: (id: string, status: ProofStatus) => void;
  approveProof: (id: string) => void;
  rejectProof: (id: string) => void;
  getProofById: (id: string) => MissionProof | undefined;
  getProofsByMission: (missionId: string) => MissionProof[];
};

export const useProofStore = create<ProofState>((set, get) => ({
  proofs: [],
  submitProof: (proof) => {
    const newProof: MissionProof = {
      id: crypto.randomUUID(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      ...proof,
    };
    set((state) => ({ proofs: [newProof, ...state.proofs] }));
    useMissionStore.getState().updateMissionStatus(proof.missionId, 'under_review');
    return newProof;
  },
  updateProofStatus: (id, status) =>
    set((state) => ({
      proofs: state.proofs.map((proof) =>
        proof.id === id ? { ...proof, status, reviewedAt: status === 'pending' ? undefined : new Date().toISOString() } : proof,
      ),
    })),
  approveProof: (id) => {
    const proof = get().getProofById(id);
    if (!proof || proof.status === 'approved') return;

    const mission = useMissionStore.getState().getMissionById(proof.missionId);
    set((state) => ({
      proofs: state.proofs.map((item) => (item.id === id ? { ...item, status: 'approved', reviewedAt: new Date().toISOString() } : item)),
    }));

    if (mission) {
      useMissionStore.getState().updateMissionStatus(mission.id, 'completed');
      if (mission.reportId) {
        useReportStore.getState().updateReportStatus(mission.reportId, 'resolved');
      }
      useEcoScoreStore
        .getState()
        .addEcoPoints(proof.userId, Math.max(mission.ecoPointsReward, 100), 'Proof approved and mission completed', 'proof', proof.id);
    }
  },
  rejectProof: (id) =>
    set((state) => ({
      proofs: state.proofs.map((proof) => (proof.id === id ? { ...proof, status: 'rejected', reviewedAt: new Date().toISOString() } : proof)),
    })),
  getProofById: (id) => get().proofs.find((proof) => proof.id === id),
  getProofsByMission: (missionId) => get().proofs.filter((proof) => proof.missionId === missionId),
}));
