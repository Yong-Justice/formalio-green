export type MissionCategory = 'cleanup' | 'tree_planting' | 'river_cleanup' | 'lake_protection' | 'awareness';
export type MissionStatus = 'active' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
export type ParticipantStatus = 'joined' | 'attended' | 'completed' | 'removed';

export type Mission = {
  id: string;
  reportId?: string;
  title: string;
  category: MissionCategory;
  description: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  missionDate: string;
  missionTime: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  ecoPointsReward: number;
  status: MissionStatus;
  createdAt: string;
  updatedAt: string;
};

export type MissionParticipant = {
  id: string;
  missionId: string;
  userId: string;
  joinedAt: string;
  status: ParticipantStatus;
};
