import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRecommendations } from './userRecommendations.model';

@Injectable()
export class UserRecommendationsService {
  constructor(
    @InjectRepository(UserRecommendations)
    private userRecommendationsRepository: Repository<UserRecommendations>,
  ) {}

  findByUserId(UserId: string): Promise<UserRecommendations> {
    return this.userRecommendationsRepository.findOne({
      where: {
        user_id: UserId,
      },
    });
  }
}
