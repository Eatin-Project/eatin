import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { Recipes } from "./recipes.model";
import { RecipesService } from "./recipes.service";

@Resolver((of) => Recipes)
export class RecipesResolver {
    constructor(@Inject(RecipesService) private recipesService: RecipesService) {}

    @Query((returns) => Recipes)
    async recipe(@Args("index") index: number, @Args("userID") userID: string): Promise<Recipes> {
        return await this.recipesService.findOne(index, userID);
    }

    @Query((returns) => [Recipes])
    async recipes(@Args("userID") userID: string): Promise<Recipes[]> {
        return await this.recipesService.findAll(userID);
    }

    @Query((returns) => [Recipes])
    async recipesByValue(
        @Args("value") value: string,
        @Args("userID") userID: string,
    ): Promise<Recipes[]> {
        return await this.recipesService
            .runQuery(`select index, recipe_title, url, record_health, vote_count, rating, description, cuisine, course,
    diet, prep_time, cook_time, ingredients, instructions, author, tags, category, image, difficulty, 
    total_time, 
case when userrecipes.is_saved is NULL then false else userrecipes.is_saved end as is_saved,
case when userrecipes.is_uploaded is NULL then false else userrecipes.is_uploaded end as is_uploaded
                                                    from recipes
                                                    left outer join userrecipes on recipes.index = userrecipes.recipe_index and userrecipes.user_id = '${userID}'
                                                    where recipes.recipe_title like '%${value}%'
                                                       or recipes.description like '%${value}%'
                                                       or recipes.author like '%${value}%'
                                                    order by recipes.vote_count desc
                                                    limit 100;`);
    }

    @Query((returns) => [Recipes])
    async topRecipesByCategory(
        @Args("category") category: string,
        @Args("userID") userID: string,
    ): Promise<Recipes[]> {
        return await this.recipesService.findTopRatedByCategory(category, userID);
    }

    @Query((returns) => [Recipes])
    async topRecipesByCuisine(
        @Args("cuisine") cuisine: string,
        @Args("userID") userID: string,
    ): Promise<Recipes[]> {
        return await this.recipesService.findTopRatedByCuisine(cuisine, userID);
    }

    @Query((returns) => [String])
    async recipeFieldOptions(
        @Args("field") field: string,
        @Args("value") value: string,
    ): Promise<string[]> {
        return await this.recipesService.getRecipeFieldOptions(field as keyof Recipes, value);
    }

    @Mutation((returns) => Recipes)
    async createRecipe(
        @Args("recipe_title") recipe_title: string,
        @Args("record_health") record_health: string,
        @Args("description") description: string,
        @Args("cuisine") cuisine: string,
        @Args("course") course: string,
        @Args("diet") diet: string,
        @Args("prep_time") prep_time: number,
        @Args("cook_time") cook_time: number,
        @Args("ingredients") ingredients: string,
        @Args("instructions") instructions: string,
        @Args("author") author: string,
        @Args("tags") tags: string,
        @Args("category") category: string,
        @Args("image") image: string,
        @Args("difficulty") difficulty: string,
        @Args("total_time") total_time: number,
    ): Promise<Recipes> {
        return await this.recipesService.create({
            recipe_title,
            record_health,
            description,
            cuisine,
            course,
            diet,
            prep_time,
            cook_time,
            ingredients,
            instructions,
            author,
            tags,
            category,
            image,
            difficulty,
            total_time,
        });
    }
}
