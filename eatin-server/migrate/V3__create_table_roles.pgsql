create table if not exists Roles
(
    id   serial primary key,
    role varchar(255) unique not null
);