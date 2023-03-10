import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import {Inject} from '@nestjs/common';
import {Recipes} from "./recipes.model";
import {RecipesService} from "./recipes.service";

@Resolver(of => Recipes)
export class RecipesResolver {
    constructor(
        @Inject(RecipesService) private recipesService: RecipesService) {
    }

    @Query(returns => Recipes)
    async recipe(@Args('index') index: number): Promise<Recipes> {
        return await this.recipesService.findOne(index);
    }

    @Query(returns => [Recipes])
    async recipes(): Promise<Recipes[]> {
        return await this.recipesService.findAll();
    }

    @Query(returns => [Recipes])
    async topRecipesByCategory(@Args('category') category: string): Promise<Recipes[]> {
        return await this.recipesService.findTopRatedByCategory(category);
    }

    @Query(returns => [Recipes])
    async topRecipesByCuisine(@Args('cuisine') cuisine: string): Promise<Recipes[]> {
        return await this.recipesService.findTopRatedByCuisine(cuisine);
    }

    @Mutation(returns => Recipes)
    async createRecipe(
        @Args('recipe_title') recipe_title: string,
        @Args('url') url: string,
        @Args('record_health') record_health: string,
        @Args('description') description: string,
        @Args('cuisine') cuisine: string,
        @Args('course') course: string,
        @Args('diet') diet: string,
        @Args('prep_time') prep_time: number,
        @Args('cook_time') cook_time: number,
        @Args('ingredients') ingredients: string,
        @Args('instructions') instructions: string,
        @Args('author') author: string,
        @Args('tags') tags: string,
        @Args('category') category: string,
        @Args('image') image: string,
        @Args('difficulty') difficulty: string,
        @Args('total_time') total_time: number

    ): Promise<Recipes> {
        return await this.recipesService.create({
            recipe_title,
            url,
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
            total_time
        })
    }
}