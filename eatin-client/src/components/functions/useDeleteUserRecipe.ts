import { useCallback, useState } from "react";
import { RemoveUserRecipesMutation, useRemoveUserRecipesMutation } from "../../generated/graphql";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useDeleteUserRecipe() {
    const [removeSavedUserRecipe] = useRemoveUserRecipesMutation();
    const [data, setData] = useState<RemoveUserRecipesMutation | null | undefined>(null);
    const userID = useGetUsersName();

    const deleteNewUserRecipe = useCallback(
        (recipeIndex: Number) => {
            if (userID.length !== 0)
                removeSavedUserRecipe({
                    variables: {
                        user_id: userID,
                        recipe_index: Number(recipeIndex),
                    },
                }).then((userRecipe) => {
                    setData(userRecipe.data);
                });
        },
        [removeSavedUserRecipe, userID],
    );

    return { data, deleteNewUserRecipe };
}
