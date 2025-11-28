create type tech_category as enum (
  'Frontend', 'Backend', 'Database', 'Fullstack', 'DevOps', 'Tools', 'Soft Skills'
);

create table technologies (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  category tech_category not null
);

create table projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  img_thumb text,
  img_gif text,
  url_deployed text,
  url_repo text,
  deployed boolean default false,
  commits int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table project_technologies (
  project_id uuid references projects(id) on delete cascade,
  tech_id uuid references technologies(id) on delete cascade,
  primary key (project_id, tech_id)
);

create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  login_method text default 'simple', 
  updated_at timestamp with time zone
);

-- Triggers
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();