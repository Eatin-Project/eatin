import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserRecipes } from './userRecipes.model';
import { UserRecipesService } from './userRecipes.service';

@Resolver((of) => UserRecipes)
export class UserRecipeResolver {
  constructor(
    @Inject(UserRecipesService) private userRecipesService: UserRecipesService,
  ) {}

  @Query((returns) => [UserRecipes])
  async userRecipesByRecipe(
    @Args('recipeID') recipeID: number,
  ): Promise<UserRecipes[]> {
    return await this.userRecipesService.findByRecipe(recipeID);
  }

  @Query((returns) => [UserRecipes])
  async userRecipesByUser(
    @Args('userID') userID: string,
  ): Promise<UserRecipes[]> {
    return await this.userRecipesService.findByUser(userID);
  }

  @Query((returns) => [UserRecipes])
  async userRecipesByUserAndIsSaved(
    @Args('userID') userID: string,
    @Args('isSaved') isSaved: boolean,
  ): Promise<UserRecipes[]> {
    return await this.userRecipesService.findByUserAndIsSaved(userID, isSaved);
  }

  @Query((returns) => [UserRecipes])
  async userRecipesByRecipeAndIsSaved(
    @Args('recipeID') recipeID: number,
    @Args('isSaved') isSaved: boolean,
  ): Promise<UserRecipes[]> {
    return await this.userRecipesService.findByRecipeAndIsSaved(
      recipeID,
      isSaved,
    );
  }

  @Query((returns) => UserRecipes)
  async userRecipesByUserAndRecipe(
    @Args('userID') userID: string,
    @Args('recipeID') recipeID: number,
  ): Promise<UserRecipes> {
    return await this.userRecipesService.findByUserAndRecipe(userID, recipeID);
  }

  @Query((returns) => [UserRecipes])
  async userRecipes(): Promise<UserRecipes[]> {
    return await this.userRecipesService.findAll();
  }

  @Mutation((returns) => UserRecipes)
  async removeUserRecipes(
    @Args('userID') userID: string,
    @Args('recipeID') recipeID: number,
  ): Promise<UserRecipes> {
    return await this.userRecipesService.removeUserRecipe(userID, recipeID);
  }

  @Mutation((returns) => UserRecipes)
  async createUserRecipes(
    @Args('user_id') user_id: string,
    @Args('recipe_index') recipe_index: number,
    @Args('is_saved') is_saved: boolean,
  ): Promise<UserRecipes> {
    return await this.userRecipesService.create({
      user_id,
      recipe_index,
      is_saved,
    });
  }
}
