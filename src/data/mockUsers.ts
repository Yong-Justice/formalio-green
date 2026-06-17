import type { Profile } from '../types/user';

export const mockUsers: Profile[] = [
  { id: 'user-justice', fullName: 'Justice', email: 'justice@example.com', city: 'Bafoussam', region: 'West Region', ecoScore: 1200, level: 'Green Champion', createdAt: '2026-01-01T09:00:00Z', updatedAt: '2026-01-01T09:00:00Z' },
  { id: 'user-sarah', fullName: 'Sarah', email: 'sarah@example.com', city: 'Dschang', region: 'West Region', ecoScore: 950, level: 'Environmental Guardian', createdAt: '2026-01-02T09:00:00Z', updatedAt: '2026-01-02T09:00:00Z' },
  { id: 'user-patrick', fullName: 'Patrick', email: 'patrick@example.com', city: 'Douala', region: 'Littoral Region', ecoScore: 870, level: 'Environmental Guardian', createdAt: '2026-01-03T09:00:00Z', updatedAt: '2026-01-03T09:00:00Z' },
  { id: 'user-emmanuel', fullName: 'Emmanuel', email: 'emmanuel@example.com', city: 'Bafoussam', region: 'West Region', ecoScore: 760, level: 'Environmental Guardian', createdAt: '2026-01-04T09:00:00Z', updatedAt: '2026-01-04T09:00:00Z' },
  { id: 'user-grace', fullName: 'Grace', email: 'grace@example.com', city: 'Yaounde', region: 'Centre Region', ecoScore: 650, level: 'Green Citizen', createdAt: '2026-01-05T09:00:00Z', updatedAt: '2026-01-05T09:00:00Z' },
];
