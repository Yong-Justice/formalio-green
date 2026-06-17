import { calculateUserLevel } from '../utils/calculateEcoScore';
import { supabase } from './supabaseClient';

export const ecoScoreService = {
  addPoints: (userId: string, points: number, description: string, sourceType = 'manual', sourceId?: string) =>
    supabase.from('eco_points').insert({ user_id: userId, points, description, source_type: sourceType, source_id: sourceId }),
  getUserPoints: (userId: string) => supabase.from('eco_points').select('*').eq('user_id', userId),
  calculateUserLevel,
};
