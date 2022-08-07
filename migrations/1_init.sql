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

create index dashboards_name_idx on dashboards(name, author_id);

create type dashboard_user_access as enum ('r', 'rw');

create table dashboards_user(
    id uuid not null default uuid_generate_v4() constraint dashboards_user_pk primary key,
    user_id uuid not null constraint user_id_fk references users(id) on update cascade on delete cascade,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    access dashboard_user_access not null default 'r'
);

create unique index dashboards_user_id_idx on dashboards_user(id);

create unique index dashboards_id_idx on dashboards(id);

create table pipelines (
    id uuid not null default uuid_generate_v4() constraint pipelines_pk primary key,
    updated_at timestamp not null default current_timestamp,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    name varchar not null,
    "order" smallint not null default 1
);

create unique index pipelines_id_idx on pipelines(id);

create index pipelines_name_idx on pipelines(name, dashboard_id);

create table cards (
    id uuid not null default uuid_generate_v4() constraint cards_pk primary key,
    updated_at timestamp not null default current_timestamp,
    pipeline_id uuid not null constraint pipeline_id_fk references pipelines(id) on update cascade on delete cascade,
    name text not null,
    "order" smallint not null default 1
);

create unique index card_id_idx on cards(id);

create table contacts (
    id uuid not null default uuid_generate_v4() constraint contacts_pk primary key,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    card_id uuid constraint card_id_fk references cards(id) on update cascade on delete set null,
    name text,
    phone text not null,
    city text
);

create index contacts_phone_idx on contacts(phone);

create unique index contacts_id_idx on contacts(id);

create type fields_type as enum ('contact', 'card');

create table fields (
    id uuid not null default uuid_generate_v4() constraint fields_pk primary key,
    name text not null,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    is_nullable boolean not null default true,
    "type" fields_type not null
);

create unique index fields_id_idx on fields(id);

create table card_fields (
    id uuid not null default uuid_generate_v4() constraint card_fields_pk primary key,
    card_id uuid not null constraint card_id_fk references cards(id) on update cascade on delete cascade,
    field_id uuid not null constraint field_id_fk references fields(id) on update cascade on delete cascade,
    value text
);

create unique index card_fields_idx on card_fields (card_id, field_id);

create unique index card_fields_id_idx on card_fields(id);

create table contact_fields (
    id uuid not null default uuid_generate_v4() constraint contact_fields_pk primary key,
    contact_id uuid not null constraint contact_id_fk references contacts(id) on update cascade on delete cascade,
    field_id uuid not null constraint field_id_fk references fields(id) on update cascade on delete cascade,
    value text
);

create index contact_fields_id_idx on contact_fields(id);

create table card_webhook (
    id uuid not null default uuid_generate_v4() constraint card_webhooks_pk primary key,
    url text not null,
    name text,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade
);

create index card_webhooks_id_idx on card_webhook(id);
create unique index card_webhook_dashboard_idx on card_webhook(dashboard_id);

create table tags (
    id uuid not null default uuid_generate_v4() constraint tags_pk primary key,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboard(id) on update cascade on delete cascade,
    text text not null,
    description text not null,
    color text not null default '#ffffff'
);

create unique index tags_text_idx on tags(text);

create table card_tags (
    id uuid not null default uuid_generate_v4() constraint card_tags_pk primary key,
    card_id uuid not null constraint card_id_fk references cards(id) on update cascade on delete cascade,
    tag_id uuid not null constraint tag_id_fk references tags(id) on update cascade on delete cascade
);

create unique index card_tags_idx on card_tags(card_id, tag_id);
