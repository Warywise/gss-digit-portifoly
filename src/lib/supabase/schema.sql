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

create or replace function public.handle_user_update()
returns trigger as $$
begin
  update public.profiles
  set
    display_name = COALESCE(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', public.profiles.display_name),
    avatar_url = COALESCE(new.raw_user_meta_data->>'avatar_url', public.profiles.avatar_url),
    updated_at = now()
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();

-- Policies 

-- ================================================================
-- 1. HABILITAR RLS (Segurança a Nível de Linha)
-- O padrão do Supabase é "Ninguém acessa nada" quando ativado.
-- ================================================================

alter table projects enable row level security;
alter table technologies enable row level security;
alter table project_technologies enable row level security;
alter table profiles enable row level security;
alter table interactions enable row level security;

-- ================================================================
-- 2. LIMPEZA (Remove regras antigas para garantir que não haja conflitos)
-- ================================================================

-- Policies de Projects
drop policy if exists "Projetos são públicos para leitura" on projects;
drop policy if exists "Admin full access" on projects;

-- Policies de Technologies
drop policy if exists "Techs são públicas para leitura" on technologies;

-- Policies de Project Technologies
drop policy if exists "Relações entre projeto e tech são públicas" on project_technologies;

-- Policies de Profiles
drop policy if exists "Perfis são públicos para leitura" on profiles;
drop policy if exists "Usuário altera seu próprio perfil" on profiles;
drop policy if exists "Update own profile" on profiles;

-- Policies de Interactions
drop policy if exists "Interações são públicas para leitura" on interactions;
drop policy if exists "Usuário pode criar interação em seu nome" on interactions;
drop policy if exists "Usuário pode deletar suas próprias interações" on interactions;
drop policy if exists "Usuário pode editar seus próprios comentários" on interactions;

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

-- Leitura: Qualquer pessoa pode ver o nome/avatar de quem comentou.
create policy "Perfis são públicos para leitura" 
on profiles for select using (true);

-- Atualização: O usuário só pode editar o próprio perfil (ex: mudar display_name).
-- A trigger 'handle_new_user' cuida da criação (INSERT), então aqui só precisamos liberar o UPDATE.
create policy "Usuário altera seu próprio perfil" 
on profiles for update 
using ( (select auth.uid()) = id )
with check ( (select auth.uid()) = id );

-- ================================================================
-- 5. REGRAS DA TABELA INTERACTIONS (Comentários e Likes)
-- ================================================================

-- Leitura: Todo mundo vê os comentários e likes de todo mundo.
create policy "Interações são públicas para leitura" 
on interactions for select using (true);

-- Criação: O usuário (anônimo ou real) pode criar, DESDE QUE o user_id seja ele mesmo.
create policy "Usuário pode criar interação em seu nome" 
on interactions for insert 
with check ( (select auth.uid()) = user_id );

-- Exclusão: O usuário só pode apagar o que ele mesmo escreveu/curtiu.
create policy "Usuário pode deletar suas próprias interações" 
on interactions for delete 
using ( (select auth.uid()) = user_id );

-- Edição: Se você quiser permitir editar comentários no futuro.
create policy "Usuário pode editar seus próprios comentários" 
on interactions for update
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );
