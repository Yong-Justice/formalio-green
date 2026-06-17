export type UserLevel = 'Beginner' | 'Eco Helper' | 'Green Champion' | 'Planet Guardian';

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
