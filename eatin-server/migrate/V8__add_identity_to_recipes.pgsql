alter table recipes
    alter column index add generated always as identity (
        minvalue 8009
        maxvalue 999999 );