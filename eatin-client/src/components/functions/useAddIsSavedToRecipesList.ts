import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useGetUserrecipesByUserIdQuery } from "../../generated/graphql";
import { Recipe } from "../types";

export function useAddIsSavedToRecipesList(recipes: Recipe[]) {
    const { currentUser } = useAuth();
    const { data: userRecipesData } = useGetUserrecipesByUserIdQuery({
        variables: { userID: currentUser ? currentUser.uid : "" },
    });
    const [recipesWithIsSaved, setRecipesWithIsSaved] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addIsSavedToRecipesList = useCallback(() => {
        setIsLoading(true);
        const updatedStateRecipes = recipes.map((recipe: Recipe) => {
            let isRecipeSaved = false;
            if (userRecipesData) {
                const index = userRecipesData.userRecipesByUser.findIndex(
                    (i) => i.recipe_index === recipe.index,
                );
                if (index !== -1) {
                    if (userRecipesData.userRecipesByUser[index].is_saved) isRecipeSaved = true;
                }
            }
            return { ...recipe, is_saved: isRecipeSaved };
        });
        setRecipesWithIsSaved([...updatedStateRecipes]);
        setIsLoading(false);
    }, [userRecipesData, recipes]);

    const updateIsSaved = useCallback(
        (isSaved: boolean, recipeIndex: number) => {
            const updatedStateRecipes = recipesWithIsSaved;
            const recipeInSectionIndex: number = updatedStateRecipes.findIndex(
                (val) => val.index === recipeIndex,
            );
            updatedStateRecipes[recipeInSectionIndex].is_saved = isSaved;
            setRecipesWithIsSaved([...updatedStateRecipes]);
        },
        [recipesWithIsSaved],
    );

    useEffect(() => {
        addIsSavedToRecipesList();
    }, [addIsSavedToRecipesList]);
    return { recipesWithIsSaved, isLoading, updateIsSaved };
}
