create table dashboard_settings (
    id uuid not null default uuid_generate_v4() constraint dashboard_settings_id_pk primary key,
    dashboard_id uuid not null constraint dashboard_id_fk references dashboards(id) on update cascade on delete cascade,
    client_token text,
    secret text
);

create unique index dashboard_settings_id_idx on dashboard_settings(id);

create unique index dashboard_settings_idx on dashboard_settings(dashboard_id);
