create table if not exists Users
(
    id        serial primary key,
    firstName varchar(50)         not null,
    lastName  varchar(50)         not null,
    email     varchar(100) unique not null,
    password  varchar(50)         not null,
    phone     varchar(10)         not null,
    gender    varchar(10)         not null,
    country   varchar(25)         not null
);