insert into storage.buckets (id, name, public)
values ('experience-photos', 'experience-photos', false);

-- Only authenticated users can upload
create policy "Authenticated users can upload photos"
  on storage.objects for insert
  with check (
    bucket_id = 'experience-photos' 
    and auth.role() = 'authenticated'
  );

-- Anyone can view photos (we serve via signed URLs anyway)
create policy "Anyone can view experience photos"
  on storage.objects for select
  using (bucket_id = 'experience-photos');
