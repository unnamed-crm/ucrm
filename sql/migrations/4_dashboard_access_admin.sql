alter type dashboard_user_access
add
    value 'admin'

create unique index dashboards_access_idx on dashboards_user(dashboard_id,user_id);
