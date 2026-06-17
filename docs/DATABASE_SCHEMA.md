# Database Schema

The Supabase foundation uses Auth-linked `profiles`, public environmental `reports`, actionable `missions`, `mission_participants`, user-submitted `proofs`, `eco_points`, `challenges`, `badges`, and `user_badges`.

Reports can become missions through `missions.report_id`. Users join missions through `mission_participants`, submit proof through `proofs`, and earn point history in `eco_points`. Badges are reusable achievements assigned through `user_badges`.

All exposed public tables have RLS enabled in `supabase/policies.sql`; public read access is limited to data intended for the map, challenges, missions, and leaderboard-style profile summaries.
