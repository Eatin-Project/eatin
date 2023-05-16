import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRecommendations } from './userRecommendations.model';
import { UserRecommendationsService } from './userRecommendations.service';
import { UserRecommendationsResolver } from './userRecommendations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecommendations])],
  providers: [UserRecommendationsService, UserRecommendationsResolver],
  exports: [UserRecommendationsService],
})
export class UserRecommendationsModule {}
