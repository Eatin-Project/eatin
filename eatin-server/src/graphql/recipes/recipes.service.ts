import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Recipes} from "./recipes.model";
import {RecipesDTO} from "./recipes.dto";

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(Recipes)
        private recipesRepository: Repository<Recipes>
    ) {
    }

    create(details: RecipesDTO): Promise<Recipes> {
        return this.recipesRepository.save(details);
    }

    findAll(): Promise<Recipes[]> {
        return this.recipesRepository.find();
    }

    findOne(index: number): Promise<Recipes> {
        return this.recipesRepository.findOneBy({index: index});
    }

    findTopRatedByCategory(category: string): Promise<Recipes[]> {
        return this.recipesRepository.find({
            order:
                {
                    rating: "DESC",
                },
            where:
                {
                    category: category
                }
            ,
            take: 20
        });
    }

    findTopRatedByCuisine(cuisine: string): Promise<Recipes[]> {
        return this.recipesRepository.find({
            order:
                {
                    rating: "DESC",
                },
            where:
                {
                    cuisine: cuisine
                }
            ,
            take: 20
        });
    }
}