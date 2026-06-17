import { create } from 'zustand';
import type { Profile } from '../types/user';
import { mockUsers } from '../data/mockUsers';
import { calculateUserLevel } from '../utils/calculateEcoScore';

type AuthState = {
  currentUser: Profile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  register: (profile: Pick<Profile, 'fullName' | 'email' | 'city' | 'region'>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: mockUsers[0],
  isAuthenticated: true,
  login: (email) => set({ currentUser: mockUsers.find((user) => user.email === email) || mockUsers[0], isAuthenticated: true }),
  logout: () => set({ currentUser: null, isAuthenticated: false }),
  register: (profile) =>
    set({
      currentUser: {
        id: crypto.randomUUID(),
        ...profile,
        ecoScore: 0,
        level: calculateUserLevel(0),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isAuthenticated: true,
    }),
}));
