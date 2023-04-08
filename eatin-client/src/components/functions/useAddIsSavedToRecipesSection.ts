import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useGetUserrecipesByUserIdQuery } from "../../generated/graphql";
import { Recipe, RecipesSection } from "../types";

export function useAddIsSavedToRecipesSection(recipes: RecipesSection[]) {
    const { currentUser } = useAuth();
    const { data: userRecipesData } = useGetUserrecipesByUserIdQuery({
        variables: { userID: currentUser ? currentUser.uid : "" },
    });
    const [recipesWithIsSaved, setRecipesWithIsSaved] = useState<RecipesSection[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addIsSavedToRecipesSection = useCallback(() => {
        setIsLoading(true);
        const updatedStateRecipes = recipes.map((section: RecipesSection) => {
            return {
                ...section,
                recipes: section.recipes.map((recipe: Recipe) => {
                    let isRecipeSaved = false;
                    if (userRecipesData) {
                        const index = userRecipesData.userRecipesByUser.findIndex(
                            (i) => i.recipe_index === recipe.index,
                        );
                        if (index !== -1) {
                            if (userRecipesData.userRecipesByUser[index].is_saved)
                                isRecipeSaved = true;
                        }
                    }
                    return { ...recipe, is_saved: isRecipeSaved };
                }),
            };
        });
        setRecipesWithIsSaved([...updatedStateRecipes]);
        setIsLoading(false);
    }, [userRecipesData, recipes]);

    const updateIsSaved = useCallback(
        (isSaved: boolean, recipeIndex: number) => {
            const updatedStateRecipes = recipesWithIsSaved.map((section: RecipesSection) => {
                const recipeInSectionIndex: number = section.recipes.findIndex(
                    (val) => val.index === recipeIndex,
                );
                if (recipeInSectionIndex !== -1) {
                    section.recipes[recipeInSectionIndex].is_saved = isSaved;
                }
                return section;
            });
            setRecipesWithIsSaved([...updatedStateRecipes]);
        },
        [recipesWithIsSaved],
    );

    useEffect(() => {
        addIsSavedToRecipesSection();
    }, [addIsSavedToRecipesSection]);
    return { recipesWithIsSaved, isLoading, updateIsSaved };
}
