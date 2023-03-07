create table if not exists users
(
    id        varchar(50)         DEFAULT replace((uuid_generate_v4())::text, '-'::text, ''::text) primary key,
    firstname varchar(50)         not null,
    lastname  varchar(50)         not null,
    email     varchar(100) unique not null,
    phone     varchar(10)         not null,
    gender    varchar(10)         not null,
    birthdate TIMESTAMP           not null,
    country   varchar(50)         not null
);