import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserRecommendationsService } from './userRecommendations.service';
import {Userrecommendations} from "./userRecommendations.model";

@Resolver((of) => Userrecommendations)
export class UserRecommendationsResolver {
  constructor(
    @Inject(UserRecommendationsService) private userRecommendationsService: UserRecommendationsService,
  ) {}

  @Query((returns) => Userrecommendations)
  async userRecommendationsByUser(
    @Args('userID') userID: string,
  ): Promise<Userrecommendations> {
    return await this.userRecommendationsService.findOneByUser(userID);
  }
}
