import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Userrecipes } from './userRecipes.model';
import { UserrecipesService } from './userRecipes.service';
import { Recipes } from '../recipes/recipes.model';

@Resolver((of) => Userrecipes)
export class UserrecipeResolver {
  constructor(
    @Inject(UserrecipesService) private userRecipesService: UserrecipesService,
  ) {}

  @Query((returns) => [Userrecipes])
  async userRecipesByRecipe(
    @Args('recipeID') recipeID: number,
  ): Promise<Userrecipes[]> {
    return await this.userRecipesService.findByRecipe(recipeID);
  }

  @Query((returns) => [Userrecipes])
  async userRecipesByUser(
    @Args('userID') userID: string,
  ): Promise<Userrecipes[]> {
    return await this.userRecipesService.findByUser(userID);
  }

  @Query((returns) => [Userrecipes])
  async userRecipesByUserAndIsSaved(
    @Args('userID') userID: string,
    @Args('isSaved') isSaved: boolean,
  ): Promise<Userrecipes[]> {
    return await this.userRecipesService.findByUserAndIsSaved(userID, isSaved);
  }

  @Query((returns) => [Userrecipes])
  async userRecipesByRecipeAndIsSaved(
    @Args('recipeID') recipeID: number,
    @Args('isSaved') isSaved: boolean,
  ): Promise<Userrecipes[]> {
    return await this.userRecipesService.findByRecipeAndIsSaved(
      recipeID,
      isSaved,
    );
  }

  @Query((returns) => [Userrecipes])
  async userRecipesByUserAndIsUploaded(
    @Args('userID') userID: string,
    @Args('isUploaded') isUploaded: boolean,
  ): Promise<Userrecipes[]> {
    return await this.userRecipesService.findByUserAndIsUploaded(
      userID,
      isUploaded,
    );
  }

  @Query((returns) => [Userrecipes])
  async userRecipesByRecipeAndIsUploaded(
    @Args('recipeID') recipeID: number,
    @Args('isUploaded') isUploaded: boolean,
  ): Promise<Userrecipes[]> {
    return await this.userRecipesService.findByRecipeAndIsUploaded(
      recipeID,
      isUploaded,
    );
  }

  @Query((returns) => Userrecipes)
  async userRecipesByUserAndRecipe(
    @Args('userID') userID: string,
    @Args('recipeID') recipeID: number,
  ): Promise<Userrecipes> {
    return await this.userRecipesService.findByUserAndRecipe(userID, recipeID);
  }

  @Query((returns) => [Userrecipes])
  async userRecipes(): Promise<Userrecipes[]> {
    return await this.userRecipesService.findAll();
  }

  @Query((returns) => [Recipes])
  async savedRecipesOfUser(@Args('userID') userID: string): Promise<Recipes[]> {
    return await this.userRecipesService.getSavedRecipesOfUser(userID);
  }

  @Mutation((returns) => Userrecipes)
  async removeUserRecipes(
    @Args('userID') userID: string,
    @Args('recipeID') recipeID: number,
  ): Promise<Userrecipes> {
    return await this.userRecipesService.removeUserRecipe(userID, recipeID);
  }

  @Mutation((returns) => Userrecipes)
  async createUserRecipes(
    @Args('user_id') user_id: string,
    @Args('recipe_index') recipe_index: number,
    @Args('is_saved') is_saved: boolean,
    @Args('is_uploaded') is_uploaded: boolean,
  ): Promise<Userrecipes> {
    return await this.userRecipesService.create({
      user_id,
      recipe_index,
      is_saved,
      given_comment: '',
      is_uploaded,
    });
  }
}
