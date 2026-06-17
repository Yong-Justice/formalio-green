import { supabase } from './supabaseClient';

export const authService = {
  signUp: (email: string, password: string, fullName: string) =>
    supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } }),
  signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getCurrentUser: () => supabase.auth.getUser(),
};
