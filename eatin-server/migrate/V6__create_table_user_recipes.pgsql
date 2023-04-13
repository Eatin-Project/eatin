create table if not exists userRecipes
(
    user_id varchar(50) not null,
    recipe_index bigint not null,
    is_saved boolean not null,

    CONSTRAINT fk_user
          FOREIGN KEY(user_id)
    	  REFERENCES users(id),
    CONSTRAINT fk_recipe
              FOREIGN KEY(recipe_index)
        	  REFERENCES recipes(index),
    CONSTRAINT pk_user_saved_recipe primary key (user_id, recipe_index)
);