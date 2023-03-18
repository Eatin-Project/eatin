create table if not exists ratings
(
    user_id varchar(50) not null,
    recipe_index bigint not null,
    rating double precision not null,

    CONSTRAINT fk_user
          FOREIGN KEY(user_id)
    	  REFERENCES users(id),
    CONSTRAINT fk_recipe
              FOREIGN KEY(recipe_index)
        	  REFERENCES recipes(index),
    CONSTRAINT pk_user_recipe primary key (user_id, recipe_index)
);
