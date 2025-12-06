-- Create pool_projects table to store user calculations
create table if not exists public.pool_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_name text not null,
  pool_shape text not null,
  length numeric,
  width numeric,
  diameter numeric,
  depth numeric,
  filtration_hours numeric not null default 5,
  pipe_material text not null,
  dn_aspiration text not null,
  dn_refoulement text not null,
  num_skimmers integer not null default 2,
  num_returns integer not null default 2,
  num_drains integer not null default 1,
  length_aspiration numeric not null,
  length_refoulement numeric not null,
  velocity_aspiration numeric not null,
  velocity_refoulement numeric not null,
  filter_pressure_loss numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.pool_projects enable row level security;

-- Policies for CRUD operations
create policy "Users can view their own projects"
  on public.pool_projects for select
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public.pool_projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.pool_projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.pool_projects for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index pool_projects_user_id_idx on public.pool_projects(user_id);
