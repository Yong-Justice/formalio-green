import { create } from 'zustand';
import { mockMissions } from '../data/mockMissions';
import type { Mission, MissionParticipant, MissionStatus } from '../types/mission';
import { useEcoScoreStore } from './ecoScoreStore';

type MissionState = {
  missions: Mission[];
  participants: MissionParticipant[];
  joinMission: (missionId: string, userId: string) => void;
  hasJoinedMission: (missionId: string, userId: string) => boolean;
  updateMissionStatus: (id: string, status: MissionStatus) => void;
  getMissionById: (id: string) => Mission | undefined;
  getMissionsByCity: (city: string) => Mission[];
};

export const useMissionStore = create<MissionState>((set, get) => ({
  missions: mockMissions,
  participants: [],
  joinMission: (missionId, userId) =>
    set((state) => {
      const alreadyJoined = state.participants.some((participant) => participant.missionId === missionId && participant.userId === userId);
      if (alreadyJoined) return state;
      useEcoScoreStore.getState().addEcoPoints(userId, 10, 'Joined mission', 'mission', missionId);
      return {
        participants: [...state.participants, { id: crypto.randomUUID(), missionId, userId, joinedAt: new Date().toISOString(), status: 'joined' }],
        missions: state.missions.map((mission) =>
          mission.id === missionId ? { ...mission, volunteersJoined: mission.volunteersJoined + 1, updatedAt: new Date().toISOString() } : mission,
        ),
      };
    }),
  updateMissionStatus: (id, status) =>
    set((state) => ({ missions: state.missions.map((mission) => (mission.id === id ? { ...mission, status, updatedAt: new Date().toISOString() } : mission)) })),
  getMissionById: (id) => get().missions.find((mission) => mission.id === id),
  getMissionsByCity: (city) => get().missions.filter((mission) => mission.city === city),
  hasJoinedMission: (missionId, userId) => get().participants.some((participant) => participant.missionId === missionId && participant.userId === userId),
}));
