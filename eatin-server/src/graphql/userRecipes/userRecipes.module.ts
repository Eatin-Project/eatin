import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRecipes } from './userRecipes.model';
import { UserRecipesService } from './userRecipes.service';
import { UserRecipeResolver } from './userRecipes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecipes])],
  providers: [UserRecipesService, UserRecipeResolver],
  exports: [UserRecipesService],
})
export class UserRecipesModule {}
