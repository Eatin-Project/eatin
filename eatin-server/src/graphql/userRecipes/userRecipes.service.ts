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
    const previousRecipe = await this.findByUserAndRecipe(
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

  async findByUser(userID: string): Promise<Userrecipes[]> {
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

  findByUserAndIsUploaded(
    userID: string,
    isUploaded: boolean,
  ): Promise<Userrecipes[]> {
    return this.userRecipesRepository.findBy({
      user_id: userID,
      is_uploaded: isUploaded,
    });
  }

  findByUserAndisCommentExists(userID: string): Promise<Userrecipes[]> {
    return this.userRecipesRepository
      .createQueryBuilder('userrecipe')
      .where('userrecipe.user_id = :userID', { userID })
      .where('length(given_comment)>0')
      .getMany();
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

  findByRecipeAndIsUploaded(
    recipeID: number,
    isUploaded: boolean,
  ): Promise<Userrecipes[]> {
    return this.userRecipesRepository.findBy({
      recipe_index: recipeID,
      is_uploaded: isUploaded,
    });
  }

  findByRecipeAndisCommentExists(recipeID: number): Promise<Userrecipes[]> {
    return this.userRecipesRepository
      .createQueryBuilder('userrecipe')
      .where('userrecipe.recipe_index = :recipeID', { recipeID })
      .where('length(given_comment)>0')
      .getMany();
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

  findByUserAndRecipeAndIsUploaded(
    userID: string,
    recipeID: number,
    isUploaded: boolean,
  ): Promise<Userrecipes> {
    return this.userRecipesRepository.findOne({
      where: {
        user_id: userID,
        recipe_index: recipeID,
        is_uploaded: isUploaded,
      },
    });
  }

  findByUserAndRecipeAndisCommentExists(
    userID: string,
    recipeID: number,
  ): Promise<Userrecipes> {
    return this.userRecipesRepository
      .createQueryBuilder('userrecipe')
      .where('userrecipe.recipe_index = :recipeID', { recipeID })
      .where('userrecipe.user_id = :userID', { userID })
      .where('length(given_comment)>0')
      .getOne();
  }

  async findByUserWithRecipe(userID: string): Promise<Userrecipes[]> {
    return await this.userRecipesRepository
      .createQueryBuilder('userrecipe')
      .leftJoinAndSelect('userrecipe.recipe', 'recipe')
      .where('userrecipe.user_id = :userID', { userID })
      .getMany();
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
