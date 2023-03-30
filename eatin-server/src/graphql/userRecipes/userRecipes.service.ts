import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRecipes } from './userRecipes.model';
import { userRecipesDTO } from './userRecipes.dto';

@Injectable()
export class UserRecipesService {
  constructor(
    @InjectRepository(UserRecipes)
    private userRecipesRepository: Repository<UserRecipes>,
  ) {}

  create(details: userRecipesDTO): Promise<UserRecipes> {
    return this.userRecipesRepository.save(details);
  }

  findAll(): Promise<UserRecipes[]> {
    return this.userRecipesRepository.find();
  }

  findByRecipe(recipeID: number): Promise<UserRecipes[]> {
    return this.userRecipesRepository.findBy({ recipe_index: recipeID });
  }

  findByUser(userID: string): Promise<UserRecipes[]> {
    return this.userRecipesRepository.findBy({ user_id: userID });
  }

  findByUserAndIsSaved(
    userID: string,
    isSaved: boolean,
  ): Promise<UserRecipes[]> {
    return this.userRecipesRepository.findBy({
      user_id: userID,
      is_saved: isSaved,
    });
  }

  findByRecipeAndIsSaved(
    recipeID: number,
    isSaved: boolean,
  ): Promise<UserRecipes[]> {
    return this.userRecipesRepository.findBy({
      recipe_index: recipeID,
      is_saved: isSaved,
    });
  }

  findByUserAndRecipe(userID: string, recipeID: number): Promise<UserRecipes> {
    return this.userRecipesRepository.findOne({
      where: { user_id: userID, recipe_index: recipeID },
    });
  }

  findByUserAndRecipeAndIsSaved(
    userID: string,
    recipeID: number,
    isSaved: boolean,
  ): Promise<UserRecipes> {
    return this.userRecipesRepository.findOne({
      where: { user_id: userID, recipe_index: recipeID, is_saved: isSaved },
    });
  }

  async removeUserRecipe(
    userID: string,
    recipeID: number,
  ): Promise<UserRecipes> {
    const item = await this.findByUserAndRecipe(userID, recipeID);
    const result = await this.userRecipesRepository.delete(item);
    return result && result.affected !== 0 ? item : null;
  }
}
