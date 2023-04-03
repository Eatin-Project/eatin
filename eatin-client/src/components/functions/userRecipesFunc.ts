import { useCallback, useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth-context";
import {
    CreateUserRecipesMutation,
    RemoveUserRecipesMutation,
    useCreateUserRecipesMutation,
    useGetUserrecipesByUserIdQuery,
    useRemoveUserRecipesMutation,
} from "../../generated/graphql";
import { Recipe, RecipesSection } from "../types";

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

export function useAddIsSavedOrUploadToRecipeList(recipesSection: RecipesSection[]) {
    const { currentUser } = useAuth();
    const { data: userRecipesData } = useGetUserrecipesByUserIdQuery({
        variables: { userID: currentUser ? currentUser.uid : "" },
    });
    const [newRecipes, setNewRecipes] = useState<RecipesSection[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addIsSavedOrUploadToRecipeList = useCallback(() => {
        setIsLoading(true);
        recipesSection.forEach((section: RecipesSection) => {
            section.recipes.forEach((recipe: Recipe) => {
                recipe["is_uploaded"] = false;
                recipe["is_saved"] = false;
                if (userRecipesData) {
                    const index = userRecipesData.userRecipesByUser.findIndex(
                        (i) => i.recipe_index === recipe.index,
                    );
                    if (index !== -1) {
                        if (userRecipesData.userRecipesByUser[index].is_saved)
                            recipe["is_saved"] = true;
                        else recipe["is_uploaded"] = true;
                    }
                }
            });
        });
        setNewRecipes([...recipesSection]);
        setIsLoading(false);
    }, [userRecipesData, recipesSection]);

    const updateSavedRecipe = useCallback(
        (isSaved: boolean, recipeIndex: number, sectionName: string) => {
            const updatedRecipes = newRecipes;
            const sectionIndex: number = updatedRecipes.findIndex(
                (val) => val.name === sectionName,
            );
            const recipeInSectionIndex: number = updatedRecipes[sectionIndex].recipes.findIndex(
                (val) => val.index === recipeIndex,
            );
            updatedRecipes[sectionIndex].recipes[recipeInSectionIndex].is_saved = isSaved;
            setNewRecipes([...updatedRecipes]);
        },
        [newRecipes],
    );

    useEffect(() => {
        addIsSavedOrUploadToRecipeList();
    }, [addIsSavedOrUploadToRecipeList]);
    return { newRecipes, isLoading, updateSavedRecipe };
}
