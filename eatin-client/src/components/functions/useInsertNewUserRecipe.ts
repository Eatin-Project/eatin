import { useCallback, useState } from "react";
import {
    CreateUserRecipesMutation,
    useCreateUserRecipesMutation,
    useGetUserrecipesByRecipeAndUserQuery,
} from "../../generated/graphql";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useInsertNewUserRecipe(recipeIndex: number) {
    const [createSavedUserRecipe] = useCreateUserRecipesMutation();
    const [data, setData] = useState<CreateUserRecipesMutation | null | undefined>(null);
    const userID = useGetUsersName();
    const { data: recipeConnection } = useGetUserrecipesByRecipeAndUserQuery({
        variables: { recipeID: recipeIndex, userID: userID },
    });

    const updateIsSaved = useCallback(
        (isSaved: boolean) => {
            const val = {
                user_id: userID,
                recipe_index: Number(recipeIndex),
                is_saved: isSaved,
                given_comment: "",
                is_uploaded: false,
            };
            if (recipeConnection) {
                val.given_comment = recipeConnection.userRecipesByUserAndRecipe.given_comment;
                val.is_uploaded = recipeConnection.userRecipesByUserAndRecipe.is_uploaded;
            }
            createSavedUserRecipe({
                variables: val,
            }).then((userRecipe) => {
                setData(userRecipe.data);
            });
        },
        [createSavedUserRecipe, recipeConnection, recipeIndex, userID],
    );

    const updateIsUploaded = useCallback(
        (isUploaded: boolean) => {
            const val = {
                user_id: userID,
                recipe_index: Number(recipeIndex),
                is_saved: isUploaded,
                given_comment: "",
                is_uploaded: false,
            };
            if (recipeConnection) {
                val.given_comment = recipeConnection.userRecipesByUserAndRecipe.given_comment;
                val.is_saved = recipeConnection.userRecipesByUserAndRecipe.is_saved;
            }
            createSavedUserRecipe({
                variables: val,
            }).then((userRecipe) => {
                setData(userRecipe.data);
            });
        },
        [createSavedUserRecipe, recipeConnection, recipeIndex, userID],
    );

    const updateGivenComment = useCallback(
        (givenComment: string) => {
            const val = {
                user_id: userID,
                recipe_index: Number(recipeIndex),
                is_saved: false,
                given_comment: givenComment,
                is_uploaded: false,
            };
            if (recipeConnection) {
                val.is_saved = recipeConnection.userRecipesByUserAndRecipe.is_saved;
                val.is_uploaded = recipeConnection.userRecipesByUserAndRecipe.is_uploaded;
            }
            createSavedUserRecipe({
                variables: val,
            }).then((userRecipe) => {
                setData(userRecipe.data);
            });
        },
        [createSavedUserRecipe, recipeConnection, recipeIndex, userID],
    );

    return { data, updateGivenComment, updateIsSaved, updateIsUploaded };
}
