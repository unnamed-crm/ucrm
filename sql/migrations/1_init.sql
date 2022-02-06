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
    user_id uuid not null constraint user_id_fk references users(id) on update cascade on delete cascade
);

create unique index dashboards_id_idx on dashboards(id);

create index dashboards_name_idx on dashboards(name, user_id);

create table columns (
    id uuid not null default uuid_generate_v4() constraint columns_pk primary key,
    updated_at timestamp not null default current_timestamp,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    name varchar not null,
    "order" smallint not null default 1
);

create unique index columns_id_idx on columns(id);

create index columns_name_idx on columns(name, dashboard_id);

create unique index columns_order_idx on columns("order", id);

create table tasks (
    id uuid not null default uuid_generate_v4() constraint task_pk primary key,
    updated_at timestamp not null default current_timestamp,
    title varchar not null,
    body text,
    column_id uuid not null constraint column_id_fk references columns(id) on update cascade on delete cascade
);

create unique index task_id_idx on tasks(id);

create table comments (
    id uuid not null default uuid_generate_v4() constraint comment_pk primary key,
    updated_at timestamp not null default current_timestamp,
    text text not null,
    task_id uuid not null constraint task_id_fk references tasks(id) on update cascade on delete cascade,
    user_id uuid not null constraint user_id_fk references users(id) on update cascade on delete cascade
);

create unique index comment_id_idx on comments(id);