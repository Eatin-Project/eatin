import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipes } from "./recipes.model";
import { RecipesDTO } from "./recipes.dto";
import { Userrecipes } from "../userRecipes/userRecipes.model";

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(Recipes)
        private recipesRepository: Repository<Recipes>,
    ) {}

    async updateRating(recipe_index: number, rating: number) {
        const recipe = await this.recipesRepository.findOne({
            where: { index: recipe_index },
        });

        if (!recipe) return;

        const newRating =
            (Number(recipe.rating) * Number(recipe.vote_count) + Number(rating)) /
            (Number(recipe.vote_count) + 1);

        this.recipesRepository.update(
            { index: recipe_index },
            { vote_count: Number(recipe.vote_count) + 1, rating: newRating },
        );
    }

    create(details: RecipesDTO): Promise<Recipes> {
        return this.recipesRepository.save({
            ...details,
            vote_count: 0,
            rating: 0,
            url: "https://nope.com",
        });
    }

    async findAll(userID: string): Promise<Recipes[]> {
        return this.recipesRepository
            .createQueryBuilder("recipes")
            .select("recipes.index", "index")
            .addSelect("recipes.recipe_title", "recipe_title")
            .addSelect("recipes.url", "url")
            .addSelect("recipes.record_health", "record_health")
            .addSelect("recipes.vote_count", "vote_count")
            .addSelect("recipes.rating", "rating")
            .addSelect("recipes.description", "description")
            .addSelect("recipes.cuisine", "cuisine")
            .addSelect("recipes.course", "course")
            .addSelect("recipes.diet", "diet")
            .addSelect("recipes.prep_time", "prep_time")
            .addSelect("recipes.cook_time", "cook_time")
            .addSelect("recipes.ingredients", "ingredients")
            .addSelect("recipes.instructions", "instructions")
            .addSelect("recipes.author", "author")
            .addSelect("recipes.tags", "tags")
            .addSelect("recipes.category", "category")
            .addSelect("recipes.image", "image")
            .addSelect("recipes.difficulty", "difficulty")
            .addSelect("recipes.total_time", "total_time")
            .addSelect(
                `case when userrecipes.is_saved is NULL then false else userrecipes.is_saved end`,
                "is_saved",
            )
            .addSelect(
                `case when userrecipes.is_uploaded is NULL then false else userrecipes.is_uploaded end`,
                "is_uploaded",
            )
            .addSelect(
                `case when userrecipes.is_uploaded is NULL then false else userrecipes.is_uploaded end`,
                "is_uploaded",
            )
            .leftJoin(
                Userrecipes,
                "userrecipes",
                `recipes.index = userrecipes.recipe_index and userrecipes.user_id = '${userID}'`,
            )
            .getRawMany();
    }

    findOne(index: number, userID: string): Promise<Recipes> {
        return this.recipesRepository
            .createQueryBuilder("recipes")
            .select("recipes.index", "index")
            .addSelect("recipes.recipe_title", "recipe_title")
            .addSelect("recipes.url", "url")
            .addSelect("recipes.record_health", "record_health")
            .addSelect("recipes.vote_count", "vote_count")
            .addSelect("recipes.rating", "rating")
            .addSelect("recipes.description", "description")
            .addSelect("recipes.cuisine", "cuisine")
            .addSelect("recipes.course", "course")
            .addSelect("recipes.diet", "diet")
            .addSelect("recipes.prep_time", "prep_time")
            .addSelect("recipes.cook_time", "cook_time")
            .addSelect("recipes.ingredients", "ingredients")
            .addSelect("recipes.instructions", "instructions")
            .addSelect("recipes.author", "author")
            .addSelect("recipes.tags", "tags")
            .addSelect("recipes.category", "category")
            .addSelect("recipes.image", "image")
            .addSelect("recipes.difficulty", "difficulty")
            .addSelect("recipes.total_time", "total_time")
            .addSelect(
                `case when userrecipes.is_saved is NULL then false else userrecipes.is_saved end`,
                "is_saved",
            )
            .addSelect(
                `case when userrecipes.is_uploaded is NULL then false else userrecipes.is_uploaded end`,
                "is_uploaded",
            )
            .leftJoin(
                Userrecipes,
                "userrecipes",
                `recipes.index = userrecipes.recipe_index and userrecipes.user_id = '${userID}'`,
            )
            .where("recipes.index = :index", { index })
            .getRawOne();
    }

    async runQuery(query: string, params?: unknown[]) {
        return this.recipesRepository.query(query, params);
    }

    findTopRatedByCategory(category: string, userID: string): Promise<Recipes[]> {
        return this.recipesRepository
            .createQueryBuilder("recipes")
            .select("recipes.index", "index")
            .addSelect("recipes.recipe_title", "recipe_title")
            .addSelect("recipes.url", "url")
            .addSelect("recipes.record_health", "record_health")
            .addSelect("recipes.vote_count", "vote_count")
            .addSelect("recipes.rating", "rating")
            .addSelect("recipes.description", "description")
            .addSelect("recipes.cuisine", "cuisine")
            .addSelect("recipes.course", "course")
            .addSelect("recipes.diet", "diet")
            .addSelect("recipes.prep_time", "prep_time")
            .addSelect("recipes.cook_time", "cook_time")
            .addSelect("recipes.ingredients", "ingredients")
            .addSelect("recipes.instructions", "instructions")
            .addSelect("recipes.author", "author")
            .addSelect("recipes.tags", "tags")
            .addSelect("recipes.category", "category")
            .addSelect("recipes.image", "image")
            .addSelect("recipes.difficulty", "difficulty")
            .addSelect("recipes.total_time", "total_time")
            .addSelect(
                `case when userrecipes.is_saved is NULL then false else userrecipes.is_saved end`,
                "is_saved",
            )
            .addSelect(
                `case when userrecipes.is_uploaded is NULL then false else userrecipes.is_uploaded end`,
                "is_uploaded",
            )
            .leftJoin(
                Userrecipes,
                "userrecipes",
                `recipes.index = userrecipes.recipe_index and userrecipes.user_id = '${userID}'`,
            )
            .orderBy("recipes.rating", "DESC")
            .where("recipes.category = :category", { category })
            .take(20)
            .getRawMany();
    }

    findTopRatedByCuisine(cuisine: string, userID: string): Promise<Recipes[]> {
        return this.recipesRepository
            .createQueryBuilder("recipes")
            .select("recipes.index", "index")
            .addSelect("recipes.recipe_title", "recipe_title")
            .addSelect("recipes.url", "url")
            .addSelect("recipes.record_health", "record_health")
            .addSelect("recipes.vote_count", "vote_count")
            .addSelect("recipes.rating", "rating")
            .addSelect("recipes.description", "description")
            .addSelect("recipes.cuisine", "cuisine")
            .addSelect("recipes.course", "course")
            .addSelect("recipes.diet", "diet")
            .addSelect("recipes.prep_time", "prep_time")
            .addSelect("recipes.cook_time", "cook_time")
            .addSelect("recipes.ingredients", "ingredients")
            .addSelect("recipes.instructions", "instructions")
            .addSelect("recipes.author", "author")
            .addSelect("recipes.tags", "tags")
            .addSelect("recipes.category", "category")
            .addSelect("recipes.image", "image")
            .addSelect("recipes.difficulty", "difficulty")
            .addSelect("recipes.total_time", "total_time")
            .addSelect(
                `case when userrecipes.is_saved is NULL then false else userrecipes.is_saved end`,
                "is_saved",
            )
            .addSelect(
                `case when userrecipes.is_uploaded is NULL then false else userrecipes.is_uploaded end`,
                "is_uploaded",
            )
            .leftJoin(
                Userrecipes,
                "userrecipes",
                `recipes.index = userrecipes.recipe_index and userrecipes.user_id = '${userID}'`,
            )
            .orderBy("recipes.rating", "DESC")
            .where("recipes.cuisine = :cuisine", { cuisine })
            .take(20)
            .getRawMany();
    }

    async getRecipeFieldOptions(field: keyof Recipes, value: string): Promise<string[]> {
        const recipes: string[] = await this.recipesRepository
            .createQueryBuilder("recipe")
            .select(field)
            .where(`LOWER(recipe.${field}) like LOWER(:value)`, { value: `%${value}%` })
            .distinct(true)
            .take(20)
            .execute();

        return recipes.map((recipe) => recipe[field]);
    }
}
