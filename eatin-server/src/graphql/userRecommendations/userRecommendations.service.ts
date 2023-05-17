import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Userrecommendations} from "../userRecommendationsCopy/userRecommendationsCopy.model";

@Injectable()
export class UserRecommendationsService {
  constructor(
    @InjectRepository(Userrecommendations)
    private userRecommendationsRepository: Repository<Userrecommendations>,
  ) {}

  async findOneByUser(userID: string): Promise<Userrecommendations> {
    return this.userRecommendationsRepository.findOne({ where: { user_id: userID }});
  }
}
