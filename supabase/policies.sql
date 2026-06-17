alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.missions enable row level security;
alter table public.mission_participants enable row level security;
alter table public.proofs enable row level security;
alter table public.eco_points enable row level security;
alter table public.challenges enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

create policy "profiles are publicly readable" on public.profiles for select using (true);
create policy "users can insert own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "users can update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "reports are publicly readable" on public.reports for select using (true);
create policy "users can create own reports" on public.reports for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "users can update own draft reports" on public.reports for update to authenticated using ((select auth.uid()) = user_id and status in ('reported', 'under_review')) with check ((select auth.uid()) = user_id);

create policy "missions are publicly readable" on public.missions for select using (true);

create policy "participants can read mission joins" on public.mission_participants for select to authenticated using (true);
create policy "users can join missions as themselves" on public.mission_participants for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "users can update own participation" on public.mission_participants for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "users can read own proofs" on public.proofs for select to authenticated using ((select auth.uid()) = user_id);
create policy "joined users can submit proof" on public.proofs for insert to authenticated with check (
  (select auth.uid()) = user_id
  and exists (
    select 1 from public.mission_participants mp
    where mp.mission_id = proofs.mission_id
    and mp.user_id = (select auth.uid())
    and mp.status in ('joined', 'attended', 'completed')
  )
);

create policy "users can read own points" on public.eco_points for select to authenticated using ((select auth.uid()) = user_id);
create policy "challenges are publicly readable" on public.challenges for select using (true);
create policy "badges are publicly readable" on public.badges for select using (true);
create policy "users can read own badges" on public.user_badges for select to authenticated using ((select auth.uid()) = user_id);
