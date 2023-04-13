import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import {Inject} from '@nestjs/common';
import {Ratings} from "./ratings.model";
import {RatingsService} from "./ratings.service";

@Resolver(of => Ratings)
export class RatingsResolver {
    constructor(
        @Inject(RatingsService) private ratingsService: RatingsService) {
    }

    @Query(returns => [Ratings])
    async ratingsByRecipe(@Args('index') index: number): Promise<Ratings[]> {
        return await this.ratingsService.findByRecipe(index);
    }

    @Query(returns => [Ratings])
    async ratingsByUser(@Args('id') id: string): Promise<Ratings[]> {
        return await this.ratingsService.findByUser(id);
    }

    @Query(returns => Ratings)
    async ratingByUserAndRecipe(@Args('id') id: string,
                                @Args('index') index: number): Promise<Ratings> {
        return await this.ratingsService.findByUserAndRecipe(id, index);
    }

    @Query(returns => [Ratings])
    async ratings(): Promise<Ratings[]> {
        return await this.ratingsService.findAll();
    }

    @Mutation(returns => Ratings)
    async createRating(
        @Args('user_id') user_id: string,
        @Args('recipe_index') recipe_index: number,
        @Args('rating') rating: number,
    ): Promise<Ratings> {
        return await
            this.ratingsService.create({
                user_id, recipe_index, rating
            });
    }
}