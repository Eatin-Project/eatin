import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Comments } from './comments.model';
import { CommentsService } from './comments.service';

@Resolver((of) => Comments)
export class CommentsResolver {
  constructor(
    @Inject(CommentsService) private commentsService: CommentsService,
  ) {}

  @Query((returns) => [Comments])
  async commentsByRecipeIndex(
    @Args('recipeID') recipeID: number,
  ): Promise<Comments[]> {
    return await this.commentsService.findByRecipeIndex(recipeID);
  }

  @Query((returns) => [Comments])
  async commentsByUserID(@Args('userID') userID: string): Promise<Comments[]> {
    return await this.commentsService.findByUserID(userID);
  }

  @Query((returns) => Comments)
  async commentsByID(@Args('id') id: string): Promise<Comments> {
    return await this.commentsService.findByID(id);
  }

  @Query((returns) => [Comments])
  async commentsByRecipeAndUser(
    @Args('recipeID') recipeID: number,
    @Args('userID') userID: string,
  ): Promise<Comments[]> {
    return await this.commentsService.findByUserAndRecipe(recipeID, userID);
  }

  @Query((returns) => [Comments])
  async comments(): Promise<Comments[]> {
    return await this.commentsService.findAll();
  }

  @Mutation((returns) => Comments)
  async removeComment(@Args('id') id: string): Promise<Comments> {
    return await this.commentsService.removeComment(id);
  }

  @Mutation((returns) => Comments)
  async createComment(
    @Args('id') id: string,
    @Args('user_id') user_id: string,
    @Args('recipe_index') recipe_index: number,
    @Args('given_comment') given_comment: string,
  ): Promise<Comments> {
    return await this.commentsService.create({
      comment_timestap: new Date(),
      given_comment,
      recipe_index,
      user_id,
      id,
    });
  }
}
