create table if not exists userrecommendations
(
    user_id varchar(50) not null,
    recommendations varchar not null,

    CONSTRAINT pk_user_id primary key (user_id)
);