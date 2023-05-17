import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRecommendationsService } from './userRecommendations.service';
import { UserRecommendationsResolver } from './userRecommendations.resolver';
import {Userrecommendations} from "./userRecommendations.model";

@Module({
  imports: [TypeOrmModule.forFeature([Userrecommendations])],
  providers: [UserRecommendationsService, UserRecommendationsResolver],
  exports: [UserRecommendationsService],
})
export class UserRecommendationsModule {}
