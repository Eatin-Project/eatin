import { useCallback, useState } from "react";
import { useAuth } from "../../context/auth-context";
import {
    CreateUserRecipesMutation,
    RemoveUserRecipesMutation,
    useCreateUserRecipesMutation,
    useRemoveUserRecipesMutation,
} from "../../generated/graphql";

export function useInsetNewUserRecipe() {
    const [createSavedUserRecipe] = useCreateUserRecipesMutation();
    const [data, setData] = useState<CreateUserRecipesMutation | null | undefined>(null);
    const { currentUser } = useAuth();

    const insertNewUserRecipe = useCallback(
        (recipeIndex: Number, isSaved: boolean) => {
            if (currentUser)
                createSavedUserRecipe({
                    variables: {
                        user_id: currentUser.uid,
                        recipe_index: Number(recipeIndex),
                        is_saved: isSaved,
                    },
                }).then((userRecipe) => {
                    console.log(userRecipe.data);
                    setData(userRecipe.data);
                });
        },
        [createSavedUserRecipe, currentUser],
    );

    return { data, insertNewUserRecipe };
}

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
                    console.log(userRecipe.data);
                    setData(userRecipe.data);
                });
        },
        [removeSavedUserRecipe, currentUser],
    );

    return { data, deleteNewUserRecipe };
}
