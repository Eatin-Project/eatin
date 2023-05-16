import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserRecommendations } from './userRecommendations.model';
import { UserRecommendationsService } from './userRecommendations.service';

@Resolver((of) => UserRecommendations)
export class UserRecommendationsResolver {
  constructor(
    @Inject(UserRecommendationsService)
    private userRecommendationsService: UserRecommendationsService,
  ) {}

  @Query((returns) => UserRecommendations)
  async userRecommendations(
    @Args('userID') userID: string,
  ): Promise<UserRecommendations> {
    return await this.userRecommendationsService.findByUserId(userID);
  }
}
