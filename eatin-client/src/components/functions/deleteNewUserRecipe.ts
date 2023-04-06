import { useCallback, useState } from "react";
import { RemoveUserRecipesMutation, useRemoveUserRecipesMutation } from "../../generated/graphql";
import { useAuth } from "../../context/auth-context";

export function useDeleteUserRecipe() {
    const [removeSavedUserRecipe] = useRemoveUserRecipesMutation();
    const [data, setData] = useState<RemoveUserRecipesMutation | null | undefined>(null);
    const { currentUser } = useAuth();

    const deleteNewUserRecipe = useCallback(
        (recipeIndex: Number) => {
            if (currentUser)
                removeSavedUserRecipe({
                    variables: {
                        user_id: currentUser.uid,
                        recipe_index: Number(recipeIndex),
                    },
                }).then((userRecipe) => {
                    setData(userRecipe.data);
                });
        },
        [removeSavedUserRecipe, currentUser],
    );

    return { data, deleteNewUserRecipe };
}
