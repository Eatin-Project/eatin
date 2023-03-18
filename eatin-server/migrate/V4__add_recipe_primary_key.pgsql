ALTER TABLE recipes DROP CONSTRAINT IF EXISTS recipes_pk CASCADE;
ALTER TABLE recipes
    ADD CONSTRAINT recipes_pk
        PRIMARY KEY (index);
