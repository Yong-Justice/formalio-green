import type { Mission, MissionStatus } from '../types/mission';
import { supabase } from './supabaseClient';

type MissionRow = {
  id: string;
  report_id?: string;
  title: string;
  category: Mission['category'];
  description: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  mission_date: string;
  mission_time: string;
  volunteers_needed: number;
  volunteers_joined: number;
  eco_points_reward: number;
  status: MissionStatus;
  created_at: string;
  updated_at: string;
};

function toMission(row: MissionRow): Mission {
  return {
    id: row.id,
    reportId: row.report_id,
    title: row.title,
    category: row.category,
    description: row.description,
    city: row.city,
    region: row.region,
    latitude: row.latitude,
    longitude: row.longitude,
    missionDate: row.mission_date,
    missionTime: row.mission_time,
    volunteersNeeded: row.volunteers_needed,
    volunteersJoined: row.volunteers_joined,
    ecoPointsReward: row.eco_points_reward,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toMissionInsert(mission: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'>) {
  return {
    report_id: mission.reportId,
    title: mission.title,
    category: mission.category,
    description: mission.description,
    city: mission.city,
    region: mission.region,
    latitude: mission.latitude,
    longitude: mission.longitude,
    mission_date: mission.missionDate,
    mission_time: mission.missionTime,
    volunteers_needed: mission.volunteersNeeded,
    volunteers_joined: mission.volunteersJoined,
    eco_points_reward: mission.ecoPointsReward,
    status: mission.status,
  };
}

export const missionService = {
  async getMissions() {
    const { data, error } = await supabase.from('missions').select('*').order('mission_date', { ascending: true }).returns<MissionRow[]>();
    return { data: data?.map(toMission) ?? null, error };
  },
  joinMission: (missionId: string, userId: string) => supabase.from('mission_participants').insert({ mission_id: missionId, user_id: userId }),
  async createMission(mission: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase.from('missions').insert(toMissionInsert(mission)).select('*').single<MissionRow>();
    return { data: data ? toMission(data) : null, error };
  },
  async updateMissionStatus(id: string, status: MissionStatus) {
    const { data, error } = await supabase.from('missions').update({ status, updated_at: new Date().toISOString() }).eq('id', id).select('*').single<MissionRow>();
    return { data: data ? toMission(data) : null, error };
  },
};
