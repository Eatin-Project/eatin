create table if not exists users
(
    id        uuid                DEFAULT uuid_generate_v4() primary key,
    firstname varchar(50)         not null,
    lastname  varchar(50)         not null,
    email     varchar(100) unique not null,
    phone     varchar(10)         not null,
    gender    varchar(10)         not null,
    country   varchar(50)         not null
);