import type { UserLevel } from '../types/user';

export function calculateUserLevel(score: number): UserLevel {
  if (score >= 1500) return 'Planet Guardian';
  if (score >= 900) return 'Green Champion';
  if (score >= 300) return 'Eco Helper';
  return 'Beginner';
}
