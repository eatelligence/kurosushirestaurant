-- Kuro Sushi CMS — initial schema
-- Run once in Supabase Dashboard → SQL Editor → Run

------------------------------------------------------------
-- 1. Tables
------------------------------------------------------------

-- Single-row table holding all restaurant-wide settings + banner
create table public.restaurant_settings (
  id smallint primary key default 1,
  name text not null,
  tagline text,
  phone text not null,
  whatsapp_number text not null,
  email text not null,
  address_street text not null,
  address_city text not null,
  address_country text not null,
  lat double precision not null,
  lng double precision not null,
  payments text[] not null default '{}',
  instagram_url text,
  tiktok_url text,
  instagram_handle text,
  banner_text text,
  banner_active boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- Opening hours, one row per weekday (0=Sunday … 6=Saturday)
create table public.opening_hours (
  day smallint primary key check (day between 0 and 6),
  open_time time,
  close_time time,
  closed boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Menu sections
create table public.menu_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  kanji text,
  romaji text,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Menu items
create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.menu_sections(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  spicy boolean not null default false,
  signature boolean not null default false,
  available boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.menu_items (section_id, sort);

-- Gallery photos
create table public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  alt text,
  sort integer not null default 0,
  featured boolean not null default false,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);
create index on public.gallery_photos (sort);

-- Optional audit log
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  diff jsonb,
  created_at timestamptz not null default now()
);

------------------------------------------------------------
-- 2. updated_at trigger helper
------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

create trigger trg_settings_touch    before update on public.restaurant_settings
  for each row execute function public.touch_updated_at();
create trigger trg_hours_touch       before update on public.opening_hours
  for each row execute function public.touch_updated_at();
create trigger trg_sections_touch    before update on public.menu_sections
  for each row execute function public.touch_updated_at();
create trigger trg_items_touch       before update on public.menu_items
  for each row execute function public.touch_updated_at();

------------------------------------------------------------
-- 3. Row Level Security
------------------------------------------------------------

alter table public.restaurant_settings enable row level security;
alter table public.opening_hours        enable row level security;
alter table public.menu_sections        enable row level security;
alter table public.menu_items           enable row level security;
alter table public.gallery_photos       enable row level security;
alter table public.audit_log            enable row level security;

-- Public read on content tables
create policy "public read settings" on public.restaurant_settings
  for select using (true);
create policy "public read hours" on public.opening_hours
  for select using (true);
create policy "public read sections" on public.menu_sections
  for select using (true);
create policy "public read items" on public.menu_items
  for select using (true);
create policy "public read gallery" on public.gallery_photos
  for select using (true);

-- Authenticated write everywhere
create policy "auth write settings" on public.restaurant_settings
  for all to authenticated using (true) with check (true);
create policy "auth write hours" on public.opening_hours
  for all to authenticated using (true) with check (true);
create policy "auth write sections" on public.menu_sections
  for all to authenticated using (true) with check (true);
create policy "auth write items" on public.menu_items
  for all to authenticated using (true) with check (true);
create policy "auth write gallery" on public.gallery_photos
  for all to authenticated using (true) with check (true);

-- Audit log: authenticated insert, authenticated read own
create policy "auth insert audit" on public.audit_log
  for insert to authenticated with check (true);
create policy "auth read audit" on public.audit_log
  for select to authenticated using (true);

------------------------------------------------------------
-- 4. Storage bucket for gallery photos
------------------------------------------------------------

insert into storage.buckets (id, name, public)
  values ('kuro-photos', 'kuro-photos', true)
  on conflict (id) do nothing;

-- Public read
create policy "public read kuro-photos"
  on storage.objects for select
  using (bucket_id = 'kuro-photos');

-- Authenticated write
create policy "auth insert kuro-photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'kuro-photos');

create policy "auth update kuro-photos"
  on storage.objects for update to authenticated
  using (bucket_id = 'kuro-photos');

create policy "auth delete kuro-photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'kuro-photos');
