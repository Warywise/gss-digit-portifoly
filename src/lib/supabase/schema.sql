create type public.tech_category as enum (
  'Frontend', 'Backend', 'Database', 'Fullstack', 'DevOps', 'Tools', 'Soft Skills'
);

create table public.technologies (
  id uuid not null default gen_random_uuid (),
  name text not null,
  category public.tech_category not null,
  constraint technologies_pkey primary key (id),
  constraint technologies_name_key unique (name)
) TABLESPACE pg_default;

create table public.projects (
  id uuid not null default gen_random_uuid (),
  name text not null,
  img_thumb text null,
  img_gif text null,
  url_deployed text null,
  url_repo text null,
  deployed boolean null default false,
  commits integer null default 0,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  description_ptbr text null,
  description_en text null,
  constraint projects_pkey primary key (id)
) TABLESPACE pg_default;

create table public.project_technologies (
  project_id uuid not null,
  tech_id uuid not null,
  constraint project_technologies_pkey primary key (project_id, tech_id),
  constraint project_technologies_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE,
  constraint project_technologies_tech_id_fkey foreign KEY (tech_id) references technologies (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.profiles (
  id uuid not null,
  username text null,
  display_name text null,
  avatar_url text null,
  login_method text null default 'simple'::text,
  updated_at timestamp with time zone null,
  is_anonymous boolean null default false,
  created_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
  constraint profiles_pkey primary key (id),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id),
  constraint check_username_length check ((length(username) > 2))
) TABLESPACE pg_default;

create type public.interaction_type as enum ('like', 'comment');

create table public.interactions (
  id uuid not null default gen_random_uuid (),
  project_id uuid not null,
  user_id uuid not null,
  type public.interaction_type not null,
  content text null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint interactions_pkey primary key (id),
  constraint interactions_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE,
  constraint interactions_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE,
  constraint check_content_validity check (
    (
      (type <> 'comment'::interaction_type)
      or (
        (content is not null)
        and (length(content) > 0)
      )
    )
  )
) TABLESPACE pg_default;

create unique INDEX IF not exists unique_user_like on public.interactions using btree (user_id, project_id) TABLESPACE pg_default
where
  (type = 'like'::interaction_type);

-- Triggers
create or replace function public.handle_new_user()
returns trigger as $$
declare
  meta_display_name text;
  meta_username text;
  meta_avatar text;
  meta_is_anon boolean;
begin
  meta_display_name := COALESCE(new.raw_user_meta_data->>'display_name');
  meta_username := new.raw_user_meta_data->>'username';
  meta_avatar := new.raw_user_meta_data->>'avatar_url';
  meta_is_anon := COALESCE((new.raw_user_meta_data->>'is_anonymous')::boolean, false);

  insert into public.profiles (id, display_name, username, avatar_url, is_anonymous)
  values (
    new.id, 
    meta_display_name, 
    meta_username,
    meta_avatar,
    meta_is_anon
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Policies 

-- ================================================================
-- 1. HABILITAR RLS (Segurança a Nível de Linha)
-- ================================================================

alter table projects enable row level security;
alter table technologies enable row level security;
alter table project_technologies enable row level security;
alter table profiles enable row level security;
alter table interactions enable row level security;

-- ================================================================
-- 2. LIMPEZA (Remove regras antigas para garantir que este script seja a verdade única)
-- ================================================================

drop policy if exists "Projetos são públicos" on projects;
drop policy if exists "Admin full access" on projects;

drop policy if exists "Techs são públicas" on technologies;

drop policy if exists "Relações são públicas" on project_technologies;

drop policy if exists "Perfis são públicos" on profiles;
drop policy if exists "Usuário altera seu próprio perfil" on profiles;
drop policy if exists "Update own profile" on profiles;

drop policy if exists "Interações são públicas" on interactions;
drop policy if exists "Usuários podem interagir" on interactions;
drop policy if exists "Usuário pode deletar sua interação" on interactions;

-- ================================================================
-- 3. REGRAS DE APENAS LEITURA (Conteúdo do Site)
-- Projetos, Techs e a relação entre eles são públicos para ler, 
-- mas ninguém (exceto admins no painel do Supabase) pode alterar.
-- ================================================================

create policy "Projetos são públicos para leitura" 
on projects for select using (true);

create policy "Techs são públicas para leitura" 
on technologies for select using (true);

create policy "Relações entre projeto e tech são públicas" 
on project_technologies for select using (true);

-- ================================================================
-- 4. REGRAS DA TABELA PROFILES
-- ================================================================

create policy "Perfis são públicos para leitura" 
on profiles for select using (true);

create policy "Usuário pode atualizar seu próprio perfil" 
on profiles for update 
using (auth.uid() = id)
with check (auth.uid() = id);

-- ================================================================
-- 5. REGRAS DA TABELA INTERACTIONS (Comentários e Likes)
-- ================================================================

create policy "Interações são públicas para leitura" 
on interactions for select using (true);

create policy "Usuário pode criar interação em seu nome" 
on interactions for insert 
with check (auth.uid() = user_id);

create policy "Usuário pode deletar suas próprias interações" 
on interactions for delete 
using (auth.uid() = user_id);

create policy "Usuário pode editar seus próprios comentários" 
on interactions for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
