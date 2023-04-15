import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useGetUserrecipesByUserWithRecipeQuery } from "../../generated/graphql";
import { Recipe } from "../types";

export function useGetSavedRecipes() {
    const { currentUser } = useAuth();
    const { data: savedRecipesRaw, refetch } = useGetUserrecipesByUserWithRecipeQuery({
        variables: { userID: currentUser ? currentUser.uid : "" },
    });

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSavedRecipes = useCallback(() => {
        setIsLoading(true);
        const newRecipes: Recipe[] = [];
        savedRecipesRaw?.userRecipesByUserWithRecipe.forEach((item) => {
            const recipeTemp = { ...item.recipe, is_saved: true };
            let { __typename, ...recipe } = recipeTemp;
            newRecipes.push(recipe);
        });
        setRecipes([...newRecipes]);
        setIsLoading(false);
    }, [savedRecipesRaw]);

    const updateIsSaved = useCallback(
        (isSaved: boolean, recipeIndex: number) => {
            const updatedStateRecipes = recipes;
            const recipeInSectionIndex: number = updatedStateRecipes.findIndex(
                (val) => val.index === recipeIndex,
            );
            updatedStateRecipes[recipeInSectionIndex].is_saved = isSaved;
            setRecipes([...updatedStateRecipes]);
        },
        [recipes],
    );

    useEffect(() => {
        refetch({ userID: currentUser ? currentUser.uid : "" });
    }, [currentUser, refetch]);

    useEffect(() => {
        getSavedRecipes();
    }, [getSavedRecipes]);
    return { recipes, isLoading, updateIsSaved };
}
