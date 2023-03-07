create table if not exists roles
(
    id   uuid                DEFAULT uuid_generate_v4() primary key,
    role varchar(255) unique not null
);