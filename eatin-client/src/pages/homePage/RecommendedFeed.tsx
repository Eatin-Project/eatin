import "./RecommendedFeed.css";
import "react-toastify/dist/ReactToastify.css";

import { FC, useEffect, useRef, useState } from "react";

import { toast, Id } from "react-toastify";
import { CategoryCarousel } from "./CategoryCarousel";
import { RecipesSection } from "../../components/types";
import {
    useDeleteUserRecipe,
    useInsetNewUserRecipe,
    useAddIsSavedOrUploadToRecipeList,
} from "../../components/functions/userRecipesFunc";
import { ToastNotification } from "../../components/ui/ToastNotification";

interface Props {
    currentRecipes: RecipesSection[];
}

export const RecommendedFeed: FC<Props> = ({ currentRecipes }) => {
    const { insertNewUserRecipe } = useInsetNewUserRecipe();
    const { deleteNewUserRecipe } = useDeleteUserRecipe();
    const { newRecipes: recipesData, isLoading } =
        useAddIsSavedOrUploadToRecipeList(currentRecipes);
    const currentSavedToastID = useRef<Id | undefined>(undefined);

    useEffect(() => {
        console.log(recipesData);
    }, [recipesData]);

    const changeRecipeSavedState = (recipeID: number, recipeName: string, isSaved: boolean) => {
        if (currentSavedToastID) {
            toast.dismiss(currentSavedToastID.current);
        }
        if (isSaved) {
            insertNewUserRecipe(recipeID, true);
            currentSavedToastID.current = toast(`${recipeName}, was saved!`);
        } else {
            deleteNewUserRecipe(recipeID);
            currentSavedToastID.current = toast(`${recipeName}, was removed...`);
        }
    };

    return (
        <div className="genres-page">
            {(recipesData ? recipesData : []).map((recipe, itemIndex) => (
                <CategoryCarousel
                    key={`${recipe.name}-${itemIndex}`}
                    title={recipe.name}
                    items={recipe.recipes}
                    itemsInOneSlider={5}
                    isLoading={isLoading}
                    changeRecipeSavedState={changeRecipeSavedState}
                    className="recommended-recipes-carousel"
                />
            ))}
            <ToastNotification />
        </div>
    );
};
