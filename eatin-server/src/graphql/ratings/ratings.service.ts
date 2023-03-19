import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {Ratings} from "./ratings.model";
import {RatingDTO} from "./ratings.dto";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Ratings)
        private ratingsRepository: Repository<Ratings>
    ) {
    }

    create(details: RatingDTO): Promise<Ratings> {
        return this.ratingsRepository.save(details, {reload: true});
    }

    findAll(): Promise<Ratings[]> {
        return this.ratingsRepository.find();
    }

    findByRecipe(index: number): Promise<Ratings[]> {
        return this.ratingsRepository.findBy({recipe_index: index});
    }

    findByUser(id: string): Promise<Ratings[]> {
        return this.ratingsRepository.findBy({user_id: id});
    }

    findByUserAndRecipe(id: string, index: number): Promise<Ratings> {
        return this.ratingsRepository.findOne({where: {user_id: id, recipe_index: index}});
    }
}