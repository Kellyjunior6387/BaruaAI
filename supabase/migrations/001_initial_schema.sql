-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE
-- mirrors Supabase auth.users, stores public profile
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  created_at timestamptz default now()
);

-- EXPERIENCES TABLE
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  slug text unique not null,
  recipient_name text not null,
  your_name text not null,
  theme text not null default 'romantic' 
    check (theme in ('romantic','playful','cinematic')),
  tier text not null default 'free' 
    check (tier in ('free','premium')),
  status text not null default 'draft' 
    check (status in ('draft','active','responded')),
  story_beats jsonb not null default '[]',
  reflection text,
  ask_line text,
  handover_note text,
  memories jsonb not null default '[]',
  date_categories jsonb not null default '[]',
  date_options jsonb not null default '[]',
  proposed_dates jsonb not null default '[]',
  closing_message text,
  created_at timestamptz default now()
);

-- PHOTOS TABLE
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid references public.experiences(id) 
    on delete cascade,
  storage_path text not null,
  sort_order int default 0,
  uploaded_at timestamptz default now()
);

-- RESPONSES TABLE
create table public.responses (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid unique references public.experiences(id) 
    on delete cascade,
  chosen_category text,
  chosen_activity text,
  chosen_date text,
  responded_at timestamptz default now()
);

-- EVENTS TABLE (analytics)
create table public.events (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid references public.experiences(id) 
    on delete cascade,
  type text not null 
    check (type in ('opened','responded','shared')),
  meta jsonb,
  occurred_at timestamptz default now()
);

-- INDEXES
create index on public.experiences(slug);
create index on public.experiences(user_id);
create index on public.experiences(status);
create index on public.photos(experience_id);
create index on public.responses(experience_id);
create index on public.events(experience_id);
create index on public.events(type);

-- AUTO-CREATE USER PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.experiences enable row level security;
alter table public.photos enable row level security;
alter table public.responses enable row level security;
alter table public.events enable row level security;

-- USERS: can only read/update own profile
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- EXPERIENCES: creators manage their own
create policy "Creators can insert experiences"
  on public.experiences for insert
  with check (auth.uid() = user_id);

create policy "Creators can view own experiences"
  on public.experiences for select
  using (auth.uid() = user_id);

create policy "Creators can update own experiences"
  on public.experiences for update
  using (auth.uid() = user_id);

create policy "Creators can delete own experiences"
  on public.experiences for delete
  using (auth.uid() = user_id);

-- EXPERIENCES: recipients can read by slug (no auth needed)
create policy "Anyone can view active experience by slug"
  on public.experiences for select
  using (status = 'active');

-- PHOTOS: follow experience ownership
create policy "Creators can manage own photos"
  on public.photos for all
  using (
    experience_id in (
      select id from public.experiences 
      where user_id = auth.uid()
    )
  );

create policy "Anyone can view photos of active experiences"
  on public.photos for select
  using (
    experience_id in (
      select id from public.experiences 
      where status = 'active'
    )
  );

-- RESPONSES: recipient can insert, creator can read
create policy "Anyone can submit a response"
  on public.responses for insert
  with check (
    experience_id in (
      select id from public.experiences 
      where status = 'active'
    )
  );

create policy "Creators can view responses to own experiences"
  on public.responses for select
  using (
    experience_id in (
      select id from public.experiences 
      where user_id = auth.uid()
    )
  );

-- EVENTS: anyone can insert, creator can read
create policy "Anyone can log events"
  on public.events for insert
  with check (true);

create policy "Creators can view own events"
  on public.events for select
  using (
    experience_id in (
      select id from public.experiences 
      where user_id = auth.uid()
    )
  );
