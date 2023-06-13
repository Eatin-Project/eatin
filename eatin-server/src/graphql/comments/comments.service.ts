import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comments } from "./comments.model";
import { CommentsDTO } from "./comments.dto";
import { Users } from "../users/users.model";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
    ) {}

    async create(details: CommentsDTO): Promise<Comments> {
        const previousComment = await this.findByIDWithoutTheUserInfo(details.id);
        if (!!previousComment) {
            Object.assign(previousComment, {
                given_comment: details.given_comment,
                comment_timestap: new Date(),
            });
            return this.commentsRepository.save(previousComment);
        }

        return this.commentsRepository.save(details);
    }

    findAll(): Promise<Comments[]> {
        return this.commentsRepository
            .createQueryBuilder("comments")
            .select("comments.id", "id")
            .addSelect("comments.user_id", "user_id")
            .addSelect("comments.recipe_index", "recipe_index")
            .addSelect("comments.given_comment", "given_comment")
            .addSelect("comments.comment_timestap", "comment_timestap")
            .addSelect("users.firstname", "user_first_name")
            .addSelect("users.lastname", "user_last_name")
            .addSelect("users.image", "user_image")
            .leftJoin(Users, "users", "users.id = comments.user_id")
            .orderBy("comments.comment_timestap", "DESC")
            .getRawMany();
    }

    findByRecipeIndex(recipeID: number): Promise<Comments[]> {
        return this.commentsRepository
            .createQueryBuilder("comments")
            .select("comments.id", "id")
            .addSelect("comments.user_id", "user_id")
            .addSelect("comments.recipe_index", "recipe_index")
            .addSelect("comments.given_comment", "given_comment")
            .addSelect("comments.comment_timestap", "comment_timestap")
            .addSelect("users.firstname", "user_first_name")
            .addSelect("users.lastname", "user_last_name")
            .addSelect("users.image", "user_image")
            .leftJoin(Users, "users", "users.id = comments.user_id")
            .orderBy("comments.comment_timestap", "DESC")
            .where("comments.recipe_index = :recipeID", { recipeID })
            .getRawMany();
    }

    findByUserID(userID: string): Promise<Comments[]> {
        return this.commentsRepository
            .createQueryBuilder("comments")
            .select("comments.id", "id")
            .addSelect("comments.user_id", "user_id")
            .addSelect("comments.recipe_index", "recipe_index")
            .addSelect("comments.given_comment", "given_comment")
            .addSelect("comments.comment_timestap", "comment_timestap")
            .addSelect("users.firstname", "user_first_name")
            .addSelect("users.lastname", "user_last_name")
            .addSelect("users.image", "user_image")
            .leftJoin(Users, "users", "users.id = comments.user_id")
            .orderBy("comments.comment_timestap", "DESC")
            .where("comments.user_id = :userID", { userID })
            .getRawMany();
    }

    findByUserAndRecipe(recipeID: number, userID: string): Promise<Comments[]> {
        return this.commentsRepository
            .createQueryBuilder("comments")
            .select("comments.id", "id")
            .addSelect("comments.user_id", "user_id")
            .addSelect("comments.recipe_index", "recipe_index")
            .addSelect("comments.given_comment", "given_comment")
            .addSelect("comments.comment_timestap", "comment_timestap")
            .addSelect("users.firstname", "user_first_name")
            .addSelect("users.lastname", "user_last_name")
            .addSelect("users.image", "user_image")
            .leftJoin(Users, "users", "users.id = comments.user_id")
            .orderBy("comments.comment_timestap", "DESC")
            .where("comments.user_id = :userID", { userID })
            .andWhere("comments.recipe_index = :recipeID", { recipeID })
            .getRawMany();
    }

    findByID(commentID: string): Promise<Comments> {
        return this.commentsRepository
            .createQueryBuilder("comments")
            .select("comments.id", "id")
            .addSelect("comments.user_id", "user_id")
            .addSelect("comments.recipe_index", "recipe_index")
            .addSelect("comments.given_comment", "given_comment")
            .addSelect("comments.comment_timestap", "comment_timestap")
            .addSelect("users.firstname", "user_first_name")
            .addSelect("users.lastname", "user_last_name")
            .addSelect("users.image", "user_image")
            .leftJoin(Users, "users", "users.id = comments.user_id")
            .orderBy("comments.comment_timestap", "DESC")
            .where("comments.id = :commentID", { commentID })
            .getRawOne();
    }

    findByIDWithoutTheUserInfo(commentID: string): Promise<Comments> {
        return this.commentsRepository.findOneBy({ id: commentID });
    }

    async removeComment(commentID: string): Promise<Comments> {
        const item = await this.findByIDWithoutTheUserInfo(commentID);

        if (item) {
            await this.commentsRepository.delete(item);
            return item;
        }
        return null;
    }
}
