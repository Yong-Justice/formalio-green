insert into public.challenges (title, description, category, city, region, target_value, current_value, reward_points, start_date, end_date)
values
  ('Bafoussam City Cleanup', 'Resolve 20 public waste reports across Bafoussam.', 'cleanup', 'Bafoussam', 'West Region', 20, 6, 300, '2026-07-01', '2026-08-01'),
  ('Tree Planting Challenge', 'Plant 500 trees across West Region communities.', 'tree_planting', 'Dschang', 'West Region', 500, 130, 500, '2026-07-01', '2026-09-01'),
  ('Zero Waste Market Drive', 'Reduce visible market waste through weekly cleanup missions.', 'cleanup', 'Bafoussam', 'West Region', 12, 3, 250, '2026-07-01', '2026-08-15')
on conflict do nothing;

insert into public.badges (name, description, icon, required_points)
values
  ('First Report', 'Submitted the first environmental report.', 'flag', 50),
  ('Cleanup Starter', 'Joined and completed a cleanup mission.', 'sprout', 300),
  ('Green Champion', 'Reached 900 Eco Points.', 'award', 900)
on conflict do nothing;
