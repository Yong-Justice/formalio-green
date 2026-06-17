import { create } from 'zustand';
import type { EcoPointTransaction } from '../types/ecoScore';
import { calculateUserLevel } from '../utils/calculateEcoScore';

type EcoScoreState = {
  ecoScore: number;
  transactions: EcoPointTransaction[];
  addEcoPoints: (userId: string, points: number, description: string, sourceType?: string, sourceId?: string) => void;
  calculateLevel: typeof calculateUserLevel;
};

export const useEcoScoreStore = create<EcoScoreState>((set) => ({
  ecoScore: 1200,
  transactions: [],
  addEcoPoints: (userId, points, description, sourceType = 'mission', sourceId) =>
    set((state) => ({
      ecoScore: state.ecoScore + points,
      transactions: [
        { id: crypto.randomUUID(), userId, sourceType, sourceId, points, description, createdAt: new Date().toISOString() },
        ...state.transactions,
      ],
    })),
  calculateLevel: calculateUserLevel,
}));
