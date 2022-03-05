create extension if not exists "uuid-ossp";

create table users (
    id uuid not null default uuid_generate_v4() constraint users_pk primary key,
    created_at timestamp not null default current_timestamp,
    email text not null,
    avatar_url text,
    password text not null CONSTRAINT password_check CHECK (char_length(password) >= 5)
);

create unique index users_email_idx on users(email);

create unique index users_id_idx on users(id);

create table dashboards (
    id uuid not null default uuid_generate_v4() constraint dashboards_pk primary key,
    updated_at timestamp not null default current_timestamp,
    name text not null,
    author_id uuid not null constraint user_id_fk references users(id) on update cascade on delete cascade
);

create type dashboard_user_access as enum ('r', 'w', 'rw');

create table dashboards_user(
    id uuid not null default uuid_generate_v4() constraint dashboards_user_pk primary key,
    user_id uuid not null constraint user_id_fk references users(id) on update cascade on delete cascade,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    access dashboard_user_access not null default 'r'
);

create unique index dashboards_user_id_idx on dashboards_user(id);

create unique index dashboards_id_idx on dashboards(id);

create index dashboards_name_idx on dashboards(name, user_id);

create table pipelines (
    id uuid not null default uuid_generate_v4() constraint pipelines_pk primary key,
    updated_at timestamp not null default current_timestamp,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    name varchar not null,
    "order" smallint not null default 1
);

create unique index pipelines_id_idx on pipelines(id);

create index pipelines_name_idx on pipelines(name, dashboard_id);

create unique index pipelines_order_idx on pipelines("order", id);

create table cards (
    id uuid not null default uuid_generate_v4() constraint task_pk primary key,
    updated_at timestamp not null default current_timestamp,
    title varchar not null,
    body text,
    pipeline_id uuid not null constraint pipeline_id_fk references pipelines(id) on update cascade on delete cascade
);

create unique index card_id_idx on cards(id);