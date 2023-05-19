import { useCallback, useEffect, useState } from "react";
import {
    useGetCommentsByRecipeIndexQuery,
    useCreateCommentsMutation,
} from "../../generated/graphql";
import { useGetUsersName } from "./useGetUsersName";
import { v4 as uuidv4 } from "uuid";
import { Comments } from "../types";

export function useGetRecipesComments(recipeIndex: number) {
    const userID = useGetUsersName();
    const [insertNewComment] = useCreateCommentsMutation();
    const [isLoading, setIsLoading] = useState(false);
    const { data: comments, refetch } = useGetCommentsByRecipeIndexQuery({
        variables: { recipeID: recipeIndex },
    });
    const [currentComments, setCurrentComments] = useState<Comments[]>([]);

    const getRecipesComment = useCallback(() => {
        setIsLoading(true);
        const updatedCommentes = comments?.commentsByRecipeIndex.map((comment) => {
            return {
                ...comment,
                comment_timestap: updatedTimestap(comment.comment_timestap),
            };
        });
        setCurrentComments(updatedCommentes ? [...updatedCommentes] : []);
        setIsLoading(false);
    }, [comments]);

    const updatedTimestap = (timestamp: string) => {
        // For some reason postgres returns the time 3 hours early then it saves...
        const seperatedDate = timestamp.replace("Z", "").split("T");
        const seperatedTime = seperatedDate[1].split(":");
        seperatedTime[0] = (+seperatedTime[0] + 3).toString();
        const updatedTime = seperatedTime.join(":");
        seperatedDate[1] = updatedTime;
        return new Date(seperatedDate.join(" "));
    };

    const addNewComment = useCallback(
        async (newComment: string) => {
            setIsLoading(true);
            const val = {
                user_id: userID,
                recipe_index: Number(recipeIndex),
                given_comment: newComment,
                comment_timestap: new Date(),
                id: uuidv4().replaceAll("-", ""),
            };
            await insertNewComment({
                variables: val,
            });
            await refetch({ recipeID: recipeIndex });
            setIsLoading(false);
        },
        [insertNewComment, recipeIndex, refetch, userID],
    );

    useEffect(() => {
        getRecipesComment();
    }, [getRecipesComment]);

    useEffect(() => {
        refetch({ recipeID: recipeIndex });
    }, [recipeIndex, refetch]);

    return {
        currentComments,
        isLoading,
        addNewComment,
    };
}
