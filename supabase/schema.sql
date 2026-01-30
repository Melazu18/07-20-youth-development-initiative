-- 07–20 Youth Development Initiative
-- Minimal starter schema for Supabase Postgres.
--
-- This is a starting point for the platform's operational backend.
-- You can apply it in the Supabase SQL editor.

-- Enable required extension(s)
create extension if not exists pgcrypto;

-- PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  -- Optional demographics used for enrollment matching and reporting
  birth_year integer,
  gender text,
  role text not null default 'participant',
  created_at timestamp with time zone not null default now()
);

-- ENROLLMENTS
-- Defines which participants are expected responders for RSVP compliance.
-- A participant can have multiple active enrollments (e.g., Football Development + Mentorship).
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_type text not null,
  -- Optional: bind enrollment to a specific venue/area string. If null, enrollment matches all locations.
  location text,
  active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  unique (user_id, program_type, location)
);

-- ACTIVITIES
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  program_type text not null,
  age_min integer not null,
  age_max integer not null,
  location text not null,
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone not null,
  capacity integer not null default 20,
  created_at timestamp with time zone not null default now()
);

-- RSVP (attendance intent)
create table if not exists public.activity_rsvp (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('attending','not_attending','waitlist')),
  created_at timestamp with time zone not null default now(),
  responded_at timestamp with time zone not null default now(),
  unique (activity_id, user_id)
);

-- SAFEGUARDING ACKNOWLEDGEMENTS
create table if not exists public.policy_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  policy_slug text not null,
  user_full_name text,
  user_email text,
  acknowledged_at timestamp with time zone not null default now(),
  unique (user_id, policy_slug)
);

-- BASIC RLS
alter table public.profiles enable row level security;
alter table public.activities enable row level security;
alter table public.activity_rsvp enable row level security;
alter table public.policy_acknowledgements enable row level security;
alter table public.enrollments enable row level security;

-- Profiles: users can read/write their own profile
create policy if not exists "Profiles are readable by owner" on public.profiles
  for select using (auth.uid() = id);

create policy if not exists "Profiles are writable by owner" on public.profiles
  for insert with check (auth.uid() = id);

create policy if not exists "Profiles updates by owner (no role escalation)" on public.profiles
  for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );

create policy if not exists "Profiles updates by admin" on public.profiles
  for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
-- Profiles: admins can read all profiles (needed for reporting/reminders)
create policy if not exists "Profiles are readable by admin" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Activities: public read; only admins insert/update/delete (role stored in profiles)
create policy if not exists "Activities are publicly readable" on public.activities
  for select using (true);

create policy if not exists "Activities writable by admins" on public.activities
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RSVP: users can manage their own RSVPs; admins can read all
create policy if not exists "RSVP readable by owner or admin" on public.activity_rsvp
  for select using (
    auth.uid() = user_id or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Enforce safeguarding acknowledgement before allowing RSVP writes.
drop policy if exists "RSVP writable by owner" on public.activity_rsvp;
create policy "RSVP writable by owner" on public.activity_rsvp
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.policy_acknowledgements pa
      where pa.user_id = auth.uid()
        and pa.policy_slug = 'safeguarding-v1'
    )
  );

create policy if not exists "RSVP updates by owner" on public.activity_rsvp
  for update using (auth.uid() = user_id);

-- Policy acknowledgements: users insert their own; admins read
create policy if not exists "Policy acknowledgements readable by owner or admin" on public.policy_acknowledgements
  for select using (
    auth.uid() = user_id or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy if not exists "Policy acknowledgements writable by owner" on public.policy_acknowledgements
  for insert with check (auth.uid() = user_id);

-- Enrollments: participants can read their own; admins can read/write for operational management.
create policy if not exists "Enrollments readable by owner" on public.enrollments
  for select using (auth.uid() = user_id);

create policy if not exists "Enrollments readable by admin" on public.enrollments
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy if not exists "Enrollments writable by admin" on public.enrollments
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Keep responded_at fresh on updates.
create or replace function public.set_rsvp_responded_at()
returns trigger
language plpgsql
as $$
begin
  new.responded_at := now();
  return new;
end;
$$;

drop trigger if exists trg_set_rsvp_responded_at on public.activity_rsvp;
create trigger trg_set_rsvp_responded_at
before update on public.activity_rsvp
for each row execute function public.set_rsvp_responded_at();


-- STAFF INVITE CODES
-- Invite codes allow controlled staff signup (volunteers/workers/board) without opening public staff registration.
create table if not exists public.staff_invites (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  role text not null check (role in ('volunteer','staff','board','admin')),
  expires_at timestamp with time zone,
  max_uses integer not null default 1,
  uses integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone not null default now()
);

-- STAFF INVITE AUDIT LOG
-- Keeps an immutable record of who used an invite, when, and what role was assigned.
-- This supports governance audits and sponsor/municipality review.
create table if not exists public.staff_invite_audit (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references public.staff_invites(id) on delete cascade,
  used_by uuid not null references auth.users(id) on delete cascade,
  assigned_role text not null,
  used_at timestamp with time zone not null default now()
);

alter table public.staff_invites enable row level security;
alter table public.staff_invite_audit enable row level security;

-- Only admins can manage invite codes.
create policy if not exists "Staff invites readable by admin" on public.staff_invites
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy if not exists "Staff invites writable by admin" on public.staff_invites
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Only admins can view the audit log.
create policy if not exists "Staff invite audit readable by admin" on public.staff_invite_audit
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Nobody inserts directly; only the security-definer consume function writes audit events.
revoke insert, update, delete on public.staff_invite_audit from anon, authenticated;

-- Validate an invite code without consuming it.
-- Security definer lets the function read staff_invites while keeping the table locked down.
create or replace function public.validate_staff_invite(p_invite_code text)
returns table (role text, expires_at timestamp with time zone, max_uses integer, uses integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hash text := encode(digest(coalesce(p_invite_code,''), 'sha256'), 'hex');
begin
  return query
  select si.role, si.expires_at, si.max_uses, si.uses
  from public.staff_invites si
  where si.code_hash = v_hash
    and (si.expires_at is null or si.expires_at > now())
    and si.uses < si.max_uses;
end;
$$;

-- Create a new invite code (admin only).
create or replace function public.create_staff_invite(
  p_role text,
  p_expires_at timestamp with time zone default null,
  p_max_uses integer default 1
)
returns table (invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_is_admin boolean;
  v_code text;
  v_hash text;
begin
  select exists(
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ) into v_is_admin;

  if not v_is_admin then
    raise exception 'Admin privileges required';
  end if;

  if p_role not in ('volunteer','staff','board','admin') then
    raise exception 'Invalid role';
  end if;

  if p_max_uses is null or p_max_uses < 1 then
    raise exception 'max_uses must be >= 1';
  end if;

  -- Random, high-entropy code (16 chars) that is easy to share.
  v_code := upper(replace(substr(gen_random_uuid()::text, 1, 16), '-', ''));
  v_hash := encode(digest(v_code, 'sha256'), 'hex');

  insert into public.staff_invites (code_hash, role, expires_at, max_uses, created_by)
  values (v_hash, p_role, p_expires_at, p_max_uses, auth.uid());

  return query select v_code;
end;
$$;

-- Consume an invite code and assign the role to the current user.
-- This is called AFTER a staff user signs up and is authenticated.
create or replace function public.consume_staff_invite(p_invite_code text)
returns table (assigned_role text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hash text := encode(digest(coalesce(p_invite_code,''), 'sha256'), 'hex');
  v_role text;
  v_invite_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  -- Lock the invite row to safely increment uses
  select si.id, si.role into v_invite_id, v_role
  from public.staff_invites si
  where si.code_hash = v_hash
    and (si.expires_at is null or si.expires_at > now())
    and si.uses < si.max_uses
  for update;

  if v_role is null then
    raise exception 'Invalid or expired invite code';
  end if;

  update public.staff_invites
  set uses = uses + 1
  where code_hash = v_hash;

  -- Audit log entry (immutable).
  insert into public.staff_invite_audit (invite_id, used_by, assigned_role)
  values (v_invite_id, auth.uid(), v_role);

  -- Ensure a profile row exists, then assign role.
  insert into public.profiles (id, role)
  values (auth.uid(), v_role)
  on conflict (id) do update set role = excluded.role;

  return query select v_role;
end;
$$;


