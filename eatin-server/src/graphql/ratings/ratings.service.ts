import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ratings } from "./ratings.model";
import { RatingDTO } from "./ratings.dto";
import { RecipesService } from "../recipes/recipes.service";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Ratings)
        private ratingsRepository: Repository<Ratings>,
        private recipesService: RecipesService,
    ) {}

    async create(details: RatingDTO): Promise<Ratings> {
        const previousRating = await this.findByUserAndRecipe(
            details.user_id,
            details.recipe_index,
        );
        if (!!previousRating) {
            Object.assign(previousRating, {
                rating: details.rating,
                rating_timestamp: new Date(),
            });
            await this.recipesService.updateRating(details.recipe_index, details.rating);

            return this.ratingsRepository.save(previousRating);
        }

        const rating = await this.ratingsRepository.save(details);
        await this.recipesService.updateRating(details.recipe_index, details.rating);

        return rating;
    }

    findAll(): Promise<Ratings[]> {
        return this.ratingsRepository.find();
    }

    findByRecipe(index: number): Promise<Ratings[]> {
        return this.ratingsRepository.findBy({ recipe_index: index });
    }

    findByUser(id: string): Promise<Ratings[]> {
        return this.ratingsRepository.findBy({ user_id: id });
    }

    findByUserAndRecipe(id: string, index: number): Promise<Ratings> {
        return this.ratingsRepository.findOne({
            where: { user_id: id, recipe_index: index },
        });
    }
}
