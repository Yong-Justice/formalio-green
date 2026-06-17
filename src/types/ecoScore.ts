import type { UserLevel } from './user';

export type EcoPointTransaction = {
  id: string;
  userId: string;
  sourceType: string;
  sourceId?: string;
  points: number;
  description: string;
  createdAt: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints: number;
  createdAt: string;
};

export type UserBadge = {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
};

export type EcoScoreSummary = {
  ecoScore: number;
  level: UserLevel;
};
