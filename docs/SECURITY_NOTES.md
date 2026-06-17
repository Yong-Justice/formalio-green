# Security Notes

Never expose the Supabase service role key in frontend code. The Vite app should only use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

Keep `.env` private and commit only `.env.example`. RLS is required for every table in exposed schemas. Image uploads need MIME validation, size limits, moderation, and ownership checks before production.

Future admin and moderator actions must run server-side, ideally through Supabase Edge Functions or another trusted backend using server-only secrets.
