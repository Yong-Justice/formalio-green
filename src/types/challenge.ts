export type ChallengeStatus = 'active' | 'completed' | 'cancelled';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  region: string;
  targetValue: number;
  currentValue: number;
  rewardPoints: number;
  startDate: string;
  endDate: string;
  status: ChallengeStatus;
  createdAt: string;
};
