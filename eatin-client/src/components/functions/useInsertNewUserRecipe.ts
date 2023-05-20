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
            const newValueToAdd = {
                user_id: userID,
                recipe_index: Number(recipeIndex),
                is_saved: isSaved,
                given_comment: "",
                is_uploaded: false,
            };
            if (recipeConnection) {
                newValueToAdd.given_comment =
                    recipeConnection.userRecipesByUserAndRecipe.given_comment;
                newValueToAdd.is_uploaded = recipeConnection.userRecipesByUserAndRecipe.is_uploaded;
            }
            createSavedUserRecipe({
                variables: newValueToAdd,
            }).then((userRecipe) => {
                setData(userRecipe.data);
            });
        },
        [createSavedUserRecipe, recipeConnection, recipeIndex, userID],
    );

    const updateIsUploaded = useCallback(
        (isUploaded: boolean) => {
            const newValueToAdd = {
                user_id: userID,
                recipe_index: Number(recipeIndex),
                is_saved: isUploaded,
                given_comment: "",
                is_uploaded: false,
            };
            if (recipeConnection) {
                newValueToAdd.given_comment =
                    recipeConnection.userRecipesByUserAndRecipe.given_comment;
                newValueToAdd.is_saved = recipeConnection.userRecipesByUserAndRecipe.is_saved;
            }
            createSavedUserRecipe({
                variables: newValueToAdd,
            }).then((userRecipe) => {
                setData(userRecipe.data);
            });
        },
        [createSavedUserRecipe, recipeConnection, recipeIndex, userID],
    );

    return { data, updateIsSaved, updateIsUploaded };
}
