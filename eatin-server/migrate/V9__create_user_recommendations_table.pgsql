create table if not exists user_recommendations
(
    user_id varchar(50) not null,
    recommendations text not null,

    CONSTRAINT pk_user_id primary key (user_id)
);