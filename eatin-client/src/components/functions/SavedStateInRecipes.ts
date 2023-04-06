import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useGetUserrecipesByUserIdQuery } from "../../generated/graphql";
import { Recipe, RecipesSection } from "../types";

export function useAddIsSavedToRecipesSection(givenRecipes: RecipesSection[]) {
    const { currentUser } = useAuth();
    const { data: userRecipesData } = useGetUserrecipesByUserIdQuery({
        variables: { userID: currentUser ? currentUser.uid : "" },
    });
    const [updatedRecipes, setNewRecipes] = useState<RecipesSection[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addIsSavedToRecipesSection = useCallback(() => {
        setIsLoading(true);
        const updatedStateRecipes = givenRecipes.map((section: RecipesSection) => {
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
        setNewRecipes([...updatedStateRecipes]);
        setIsLoading(false);
    }, [userRecipesData, givenRecipes]);

    const updateSavedStateInRecipesSection = useCallback(
        (isSaved: boolean, recipeIndex: number) => {
            const updatedStateRecipes = updatedRecipes.map((section: RecipesSection) => {
                const recipeInSectionIndex: number = section.recipes.findIndex(
                    (val) => val.index === recipeIndex,
                );
                if (recipeInSectionIndex !== -1) {
                    section.recipes[recipeInSectionIndex].is_saved = isSaved;
                }
                return section;
            });
            setNewRecipes([...updatedStateRecipes]);
        },
        [updatedRecipes],
    );

    useEffect(() => {
        addIsSavedToRecipesSection();
    }, [addIsSavedToRecipesSection]);
    return { updatedRecipes, isLoading, updateSavedStateInRecipesSection };
}

export function useAddIsSavedToRecipesList(givenRecipes: Recipe[]) {
    const { currentUser } = useAuth();
    const { data: userRecipesData } = useGetUserrecipesByUserIdQuery({
        variables: { userID: currentUser ? currentUser.uid : "" },
    });
    const [updatedRecipes, setNewRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addIsSavedToRecipesList = useCallback(() => {
        setIsLoading(true);
        const updatedStateRecipes = givenRecipes.map((recipe: Recipe) => {
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
        setNewRecipes([...updatedStateRecipes]);
        setIsLoading(false);
    }, [userRecipesData, givenRecipes]);

    const updateSavedStateInRecipesList = useCallback(
        (isSaved: boolean, recipeIndex: number) => {
            const updatedStateRecipes = updatedRecipes;
            const recipeInSectionIndex: number = updatedStateRecipes.findIndex(
                (val) => val.index === recipeIndex,
            );
            updatedStateRecipes[recipeInSectionIndex].is_saved = isSaved;
            setNewRecipes([...updatedStateRecipes]);
        },
        [updatedRecipes],
    );

    useEffect(() => {
        addIsSavedToRecipesList();
    }, [addIsSavedToRecipesList]);
    return { updatedRecipes, isLoading, updateSavedStateInRecipesList };
}
