# Formalio Green

**Report. Act. Restore.**

Formalio Green is an environmental impact platform foundation for a hackathon MVP. Citizens can report environmental problems, view them on a Green Map, join cleanup or tree-planting missions, submit proof, earn Eco Points, and track local impact.

This repository currently focuses on architecture and developer foundation, not final screen design.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Zustand
- React Hook Form + Zod
- Leaflet + OpenStreetMap
- Supabase Auth, PostgreSQL, Storage, and RLS-ready SQL
- Vercel-ready frontend hosting

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to a private `.env` when real Supabase credentials are ready. Only use the Supabase anon public key in the frontend.

## Routes

- `/` Splash
- `/onboarding`
- `/login`
- `/register`
- `/home`
- `/map`
- `/report`
- `/missions`
- `/missions/:id`
- `/submit-proof/:missionId`
- `/verification/:proofId`
- `/leaderboard`
- `/challenges`
- `/profile`

## Supabase

SQL foundation files live in `supabase/`:

- `schema.sql`
- `policies.sql`
- `storage.sql`
- `seed.sql`

The SQL includes explicit grants plus RLS policies for the MVP access model.

## Documentation

Project notes live in `docs/`:

- `MVP_SCOPE.md`
- `DATABASE_SCHEMA.md`
- `DEMO_FLOW.md`
- `APP_ARCHITECTURE.md`
- `FUTURE_ROADMAP.md`
- `SECURITY_NOTES.md`
