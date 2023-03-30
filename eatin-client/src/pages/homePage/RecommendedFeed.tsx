import "./RecommendedFeed.css";
import "react-toastify/dist/ReactToastify.css";

import { FC, useRef, useState } from "react";

import { toast, Id } from "react-toastify";
import { CategoryCarousel } from "./CategoryCarousel";
import { RecipesSection } from "../../components/types";
import { ToastNotification } from "../../components/ui/ToastNotification";
import {
    useCreateUserRecipesMutation,
    useRemoveUserRecipesMutation,
} from "../../generated/graphql";
import { useAuth } from "../../context/auth-context";

interface Props {
    currentRecipes: RecipesSection[];
}

export const RecommendedFeed: FC<Props> = ({ currentRecipes }) => {
    const [createSavedUserRecipe] = useCreateUserRecipesMutation();
    const [removedUserRecipe] = useRemoveUserRecipesMutation();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const currentSavedToastID = useRef<Id | undefined>(undefined);

    const insertNewUserRecipe = (recipeIndex: Number, isSaved: boolean) => {
        if (currentUser?.uid) {
            createSavedUserRecipe({
                variables: {
                    user_id: currentUser?.uid,
                    recipe_index: Number(recipeIndex),
                    is_saved: isSaved,
                },
            }).then((userRecipe) => console.log(userRecipe.data));
        }
    };

    const removeUserRecipe = (recipeIndex: Number) => {
        if (currentUser?.uid) {
            removedUserRecipe({
                variables: {
                    user_id: currentUser?.uid,
                    recipe_index: Number(recipeIndex),
                },
            }).then((userRecipe) =>
                console.log(userRecipe ? userRecipe.data : "Nothing was removed"),
            );
        }
    };

    const changeRecipeSavedState = (recipeID: number, recipeName: string, isSaved: boolean) => {
        if (currentSavedToastID) {
            toast.dismiss(currentSavedToastID.current);
        }
        if (isSaved) {
            insertNewUserRecipe(recipeID, true);
            currentSavedToastID.current = toast(`${recipeName}, was saved!`);
        } else {
            removeUserRecipe(recipeID);
            currentSavedToastID.current = toast(`${recipeName}, was removed...`);
        }
    };

    return (
        <div className="genres-page">
            {currentRecipes.map((recipe, itemIndex) => (
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
