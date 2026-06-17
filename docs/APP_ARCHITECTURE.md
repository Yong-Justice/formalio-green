# App Architecture

The frontend is React + Vite + TypeScript with React Router routes inside a reusable mobile `PhoneFrame`. Zustand stores simulate auth, reports, missions, Eco Points, and app preferences until Supabase is fully connected.

Services in `src/services` define Supabase integration boundaries for auth, reports, missions, uploads, maps, and Eco Points. Components are grouped by domain: map, reports, missions, dashboard, leaderboard, and shared common UI.

The Green Map uses Leaflet and OpenStreetMap. Reports and missions are converted into marker contracts through `mapService`, with marker colors controlled by shared utility logic.

The structure is intentionally small enough for a hackathon but separated enough to support later admin workflows, richer verification, and production Supabase policies.
