import type { UserLevel } from '../types/user';

export function calculateUserLevel(score: number): UserLevel {
  if (score >= 2000) return 'Earth Protector';
  if (score >= 1200) return 'Green Champion';
  if (score >= 700) return 'Environmental Guardian';
  if (score >= 250) return 'Green Citizen';
  return 'Beginner';
}
