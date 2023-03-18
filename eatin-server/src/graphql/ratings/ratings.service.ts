import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, Repository} from 'typeorm';
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
        return this.ratingsRepository.save(details);
    }

    findAll(): Promise<Ratings[]> {
        return this.ratingsRepository.find();
    }

    findByRecipe(index: number): Promise<Ratings[]> {
        return this.ratingsRepository.findBy({recipe_index: index});
    }

    findByUser(user_id: string): Promise<Ratings[]> {
        return this.ratingsRepository.findBy({user_id: user_id});
    }
}