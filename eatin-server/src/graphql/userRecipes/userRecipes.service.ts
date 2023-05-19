import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userrecipes } from './userRecipes.model';
import { UserrecipeDTO } from './userRecipes.dto';
import { Recipes } from '../recipes/recipes.model';

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
      Object.assign(previousRecipe, {
        is_saved: details.is_saved,
        is_uploaded: details.is_uploaded,
      });
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

  getSavedRecipesOfUser(userID: string): Promise<Recipes[]> {
    return this.userRecipesRepository
      .createQueryBuilder('userrecipes')
      .select('recipes.index', 'index')
      .addSelect('recipes.recipe_title', 'recipe_title')
      .addSelect('recipes.url', 'url')
      .addSelect('recipes.record_health', 'record_health')
      .addSelect('recipes.vote_count', 'vote_count')
      .addSelect('recipes.rating', 'rating')
      .addSelect('recipes.description', 'description')
      .addSelect('recipes.cuisine', 'cuisine')
      .addSelect('recipes.course', 'course')
      .addSelect('recipes.diet', 'diet')
      .addSelect('recipes.prep_time', 'prep_time')
      .addSelect('recipes.cook_time', 'cook_time')
      .addSelect('recipes.ingredients', 'ingredients')
      .addSelect('recipes.instructions', 'instructions')
      .addSelect('recipes.author', 'author')
      .addSelect('recipes.tags', 'tags')
      .addSelect('recipes.category', 'category')
      .addSelect('recipes.image', 'image')
      .addSelect('recipes.difficulty', 'difficulty')
      .addSelect('recipes.total_time', 'total_time')
      .addSelect('userrecipes.is_saved', 'is_saved')
      .addSelect('userrecipes.is_uploaded', 'is_uploaded')
      .leftJoin(Recipes, 'recipes', `recipes.index = userrecipes.recipe_index`)
      .where('userrecipes.user_id = :userID', { userID })
      .andWhere('userrecipes.is_saved = true')
      .getRawMany();
  }
}
