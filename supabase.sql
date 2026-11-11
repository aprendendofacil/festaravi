-- Cole tudo isto no Supabase: SQL Editor → New query → Run

create table if not exists public.convidados (
  id         bigint generated always as identity primary key,
  criado_em  timestamptz not null default now(),
  familia    text not null check (char_length(familia) between 1 and 80),
  nome       text not null check (char_length(nome) between 1 and 80),
  idade      int  not null check (idade between 0 and 120)
);

alter table public.convidados enable row level security;

-- Qualquer pessoa (sem login) pode CONFIRMAR presença
drop policy if exists "qualquer um confirma" on public.convidados;
create policy "qualquer um confirma" on public.convidados
  for insert to anon, authenticated with check (true);

-- Só quem faz login (você) pode VER a lista
drop policy if exists "pais veem a lista" on public.convidados;
create policy "pais veem a lista" on public.convidados
  for select to authenticated using (true);

-- Só quem faz login (você) pode APAGAR
drop policy if exists "pais apagam" on public.convidados;
create policy "pais apagam" on public.convidados
  for delete to authenticated using (true);

grant insert on public.convidados to anon;
grant select, insert, delete on public.convidados to authenticated;
