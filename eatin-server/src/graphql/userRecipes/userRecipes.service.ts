import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userrecipes } from './userRecipes.model';
import { UserrecipeDTO } from './userRecipes.dto';

@Injectable()
export class UserrecipesService {
  constructor(
    @InjectRepository(Userrecipes)
    private userRecipesRepository: Repository<Userrecipes>,
  ) {}

  async create(details: UserrecipeDTO): Promise<Userrecipes> {
    let previousRecipe = await this.findByUserAndRecipe(
      details.user_id,
      details.recipe_index,
    );
    if (!!previousRecipe) {
      Object.assign(previousRecipe, { is_saved: details.is_saved });
      return this.userRecipesRepository.save(previousRecipe);
    }
    return this.userRecipesRepository.save(details);
  }

  findAll(): Promise<Userrecipes[]> {
    return this.userRecipesRepository.find();
  }

  findByRecipe(recipeID: number): Promise<Userrecipes[]> {
    return this.userRecipesRepository.findBy({ recipe_index: recipeID });
  }

  findByUser(userID: string): Promise<Userrecipes[]> {
    return this.userRecipesRepository.findBy({ user_id: userID });
  }

  findByUserAndIsSaved(
    userID: string,
    isSaved: boolean,
  ): Promise<Userrecipes[]> {
    return this.userRecipesRepository.findBy({
      user_id: userID,
      is_saved: isSaved,
    });
  }

  findByRecipeAndIsSaved(
    recipeID: number,
    isSaved: boolean,
  ): Promise<Userrecipes[]> {
    return this.userRecipesRepository.findBy({
      recipe_index: recipeID,
      is_saved: isSaved,
    });
  }

  findByUserAndRecipe(userID: string, recipeID: number): Promise<Userrecipes> {
    return this.userRecipesRepository.findOne({
      where: { user_id: userID, recipe_index: recipeID },
    });
  }

  findByUserAndRecipeAndIsSaved(
    userID: string,
    recipeID: number,
    isSaved: boolean,
  ): Promise<Userrecipes> {
    return this.userRecipesRepository.findOne({
      where: { user_id: userID, recipe_index: recipeID, is_saved: isSaved },
    });
  }

  async removeUserRecipe(
    userID: string,
    recipeID: number,
  ): Promise<Userrecipes> {
    const item = await this.findByUserAndRecipe(userID, recipeID);
    if (item) {
      await this.userRecipesRepository.delete(item);
      return item;
    }
    return null;
  }
}
