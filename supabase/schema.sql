create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  city text,
  region text,
  profile_photo_url text,
  eco_score integer not null default 0,
  level text not null default 'Beginner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  title text not null,
  issue_type text not null,
  description text,
  severity text not null,
  city text,
  region text,
  latitude double precision,
  longitude double precision,
  photo_url text,
  status text not null default 'reported' check (status in ('reported', 'under_review', 'mission_created', 'resolved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references public.reports(id) on delete set null,
  title text not null,
  category text not null,
  description text,
  city text,
  region text,
  latitude double precision,
  longitude double precision,
  mission_date date,
  mission_time time,
  volunteers_needed integer,
  volunteers_joined integer not null default 0,
  eco_points_reward integer not null default 0,
  status text not null default 'active' check (status in ('active', 'in_progress', 'under_review', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_participants (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  status text not null default 'joined' check (status in ('joined', 'attended', 'completed', 'removed')),
  unique (mission_id, user_id)
);

create table if not exists public.proofs (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  before_photo_url text,
  after_photo_url text,
  video_url text,
  notes text,
  latitude double precision,
  longitude double precision,
  status text not null default 'pending' check (status in ('pending', 'under_review', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.eco_points (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_type text,
  source_id uuid,
  points integer not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  city text,
  region text,
  target_value integer,
  current_value integer not null default 0,
  reward_points integer not null default 0,
  start_date date,
  end_date date,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  required_points integer,
  created_at timestamptz not null default now()
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

create index if not exists reports_user_id_idx on public.reports(user_id);
create index if not exists missions_report_id_idx on public.missions(report_id);
create index if not exists mission_participants_user_id_idx on public.mission_participants(user_id);
create index if not exists proofs_mission_id_idx on public.proofs(mission_id);
create index if not exists proofs_user_id_idx on public.proofs(user_id);
create index if not exists eco_points_user_id_idx on public.eco_points(user_id);
create index if not exists user_badges_badge_id_idx on public.user_badges(badge_id);

grant select on public.profiles, public.reports, public.missions, public.challenges, public.badges to anon, authenticated;
grant insert, update on public.profiles, public.reports, public.mission_participants, public.proofs to authenticated;
grant select on public.mission_participants, public.proofs, public.eco_points, public.user_badges to authenticated;
grant insert on public.eco_points, public.user_badges to authenticated;
