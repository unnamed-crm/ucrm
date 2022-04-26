create type message_status as enum ('sent', 'delivered', 'failed');

create table messages (
    id uuid not null default uuid_generate_v4() constraint message_id_pk primary key,
    payload jsonb,
    sender_id uuid not null,
    created_at timestamp not null default now(),
    deleted boolean not null default false,
    status message_status not null default 'sent'
);

create type chat_last_sender as enum ('employee', 'client');

create table chats (
    card_id uuid not null constraint card_id_fk references cards (id) on delete cascade on update cascade,
    id uuid not null default uuid_generate_v4() constraint chats_id_pk primary key,
    last_sender chat_last_sender,
    last_employee_id uuid constraint user_fk_id references users (id) on delete
    set
        null on update cascade,
        last_message uuid constraint message_fk_id references messages (id) on delete
    set
        null on update cascade
);

alter table messages
add column chat_id uuid not null 
constraint chat_id_fk references chats(id) 
on delete cascade on update cascade

create unique index chat_id_idx on chats(id);

create unique index message_id_idx on messages(id);
