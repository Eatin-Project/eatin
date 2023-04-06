import { useCallback, useState } from "react";
import { CreateUserRecipesMutation, useCreateUserRecipesMutation } from "../../generated/graphql";
import { useAuth } from "../../context/auth-context";

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
                    setData(userRecipe.data);
                });
        },
        [createSavedUserRecipe, currentUser],
    );

    return { data, insertNewUserRecipe };
}
