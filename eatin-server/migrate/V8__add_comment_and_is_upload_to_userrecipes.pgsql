alter table userrecipes add column is_uploaded boolean not null default false;
alter table userrecipes add column given_comment varchar(100) not null default '';