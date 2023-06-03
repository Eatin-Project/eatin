import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipes } from "./recipes.model";
import { RecipesDTO } from "./recipes.dto";

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(Recipes)
        private recipesRepository: Repository<Recipes>,
    ) {}

    create(details: RecipesDTO): Promise<Recipes> {
        return this.recipesRepository.save({
            ...details,
            vote_count: 0,
            rating: 0,
            url: "https://nope.com",
        });
    }

    findAll(): Promise<Recipes[]> {
        return this.recipesRepository.find();
    }

    findOne(index: number): Promise<Recipes> {
        return this.recipesRepository.findOneBy({ index: index });
    }

    runQuery(query: string, params?: unknown[]) {
        return this.recipesRepository.query(query, params);
    }

    findTopRatedByCategory(category: string): Promise<Recipes[]> {
        return this.recipesRepository.find({
            order: {
                rating: "DESC",
            },
            where: {
                category: category,
            },
            take: 20,
        });
    }

    findTopRatedByCuisine(cuisine: string): Promise<Recipes[]> {
        return this.recipesRepository.find({
            order: {
                rating: "DESC",
            },
            where: {
                cuisine: cuisine,
            },
            take: 20,
        });
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
