insert into storage.buckets (id, name, public)
values
  ('report-photos', 'report-photos', true),
  ('proof-photos', 'proof-photos', true),
  ('profile-photos', 'profile-photos', true),
  ('mission-images', 'mission-images', true)
on conflict (id) do nothing;

drop policy if exists "authenticated users can upload report photos" on storage.objects;
drop policy if exists "authenticated users can upload proof photos" on storage.objects;
drop policy if exists "users can upload profile photos" on storage.objects;
drop policy if exists "authenticated users can upload mission images" on storage.objects;

create policy "authenticated users can upload report photos" on storage.objects for insert to authenticated with check (bucket_id = 'report-photos');

create policy "authenticated users can upload proof photos" on storage.objects for insert to authenticated with check (bucket_id = 'proof-photos');

create policy "users can upload profile photos" on storage.objects for insert to authenticated with check (bucket_id = 'profile-photos');

create policy "authenticated users can upload mission images" on storage.objects for insert to authenticated with check (bucket_id = 'mission-images');

-- Before production, tighten path ownership checks, MIME validation, max file size, and moderation workflows.
