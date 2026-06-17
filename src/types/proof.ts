export type ProofStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export type MissionProof = {
  id: string;
  missionId: string;
  userId: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  videoUrl?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
  status: ProofStatus;
  submittedAt: string;
  reviewedAt?: string;
};
