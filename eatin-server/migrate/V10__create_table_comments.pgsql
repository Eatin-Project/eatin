create table if not exists comments
(
    id varchar(50) default replace((uuid_generate_v4())::text, '-'::text, ''::text) primary key,
    user_id varchar(50) not null,
    recipe_index bigint not null,
    given_comment text not null default '',
    comment_timestap timestamp not null default now()
);