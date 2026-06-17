import { supabase } from './supabaseClient';

async function uploadImage(bucket: string, path: string, file: File) {
  return supabase.storage.from(bucket).upload(path, file, { upsert: false });
}

export const uploadService = {
  uploadReportPhoto: (path: string, file: File) => uploadImage('report-photos', path, file),
  uploadProofPhoto: (path: string, file: File) => uploadImage('proof-photos', path, file),
  uploadProfilePhoto: (path: string, file: File) => uploadImage('profile-photos', path, file),
};
