import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { RatingsModule } from './ratings/ratings.module';
import { UserrecipesModule } from './userRecipes/userRecipes.module';

@Module({
  imports: [UsersModule, RecipesModule, RatingsModule, UserrecipesModule],
  providers: [],
  exports: [],
})
export class GraphqlModule {}
