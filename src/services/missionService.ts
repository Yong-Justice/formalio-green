import type { Mission, MissionStatus } from '../types/mission';
import { supabase } from './supabaseClient';

export const missionService = {
  getMissions: () => supabase.from('missions').select('*').order('mission_date', { ascending: true }),
  joinMission: (missionId: string, userId: string) => supabase.from('mission_participants').insert({ mission_id: missionId, user_id: userId }),
  createMission: (mission: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'>) => supabase.from('missions').insert(mission),
  updateMissionStatus: (id: string, status: MissionStatus) => supabase.from('missions').update({ status }).eq('id', id),
};
