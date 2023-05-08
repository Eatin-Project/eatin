import { useCallback, useState } from "react";
import { CreateUserRecipesMutation, useCreateUserRecipesMutation } from "../../generated/graphql";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useInsertNewUserRecipe() {
    const [createSavedUserRecipe] = useCreateUserRecipesMutation();
    const [data, setData] = useState<CreateUserRecipesMutation | null | undefined>(null);
    const userID = useGetUsersName();

    const insertNewUserRecipe = useCallback(
        (recipeIndex: Number, isSaved: boolean) => {
            if (userID.length !== 0)
                createSavedUserRecipe({
                    variables: {
                        user_id: userID,
                        recipe_index: Number(recipeIndex),
                        is_saved: isSaved,
                        given_comment: "",
                        is_uploaded: false,
                    },
                }).then((userRecipe) => {
                    setData(userRecipe.data);
                });
        },
        [createSavedUserRecipe, userID],
    );

    return { data, insertNewUserRecipe };
}
