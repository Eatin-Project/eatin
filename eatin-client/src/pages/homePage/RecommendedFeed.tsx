import "./RecommendedFeed.css";
import "react-toastify/dist/ReactToastify.css";

import { FC, useRef, useState } from "react";

import { toast, Id } from "react-toastify";
import { CategoryCarousel } from "./CategoryCarousel";
import { Recipe, RecipesSection } from "../../components/types";
import { ToastNotification } from "../../components/ui/ToastNotification";

interface Props {
    currentRecipes: RecipesSection[];
}

export const RecommendedFeed: FC<Props> = ({ currentRecipes }) => {
    const [isLoading, setIsLoading] = useState(false);
    const currentSavedToastID = useRef<Id | undefined>(undefined);

    const changeRecipeSavedState = (recipeID: number, recipeName: string, isSaved: boolean) => {
        if (currentSavedToastID) {
            toast.dismiss(currentSavedToastID.current);
        }

        if (isSaved) {
            currentSavedToastID.current = toast(`${recipeName}, was saved!`);
        } else {
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
