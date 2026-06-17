export type UserLevel = 'Beginner' | 'Green Citizen' | 'Environmental Guardian' | 'Green Champion' | 'Earth Protector';

export type Profile = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  region: string;
  profilePhotoUrl?: string;
  ecoScore: number;
  level: UserLevel;
  createdAt: string;
  updatedAt: string;
};
