import "./RecommendedFeed.css";
import "react-toastify/dist/ReactToastify.css";

import { FC } from "react";

import { CategoryCarousel } from "./CategoryCarousel";
import { RecipesSection } from "../../components/types";
import { useAddIsSavedOrUploadToRecipeList } from "../../components/functions/userRecipesFunc";

interface Props {
    currentRecipes: RecipesSection[];
}

export const RecommendedFeed: FC<Props> = ({ currentRecipes }) => {
    const {
        newRecipes: recipesData,
        isLoading,
        updateSavedRecipe,
    } = useAddIsSavedOrUploadToRecipeList(currentRecipes);

    return (
        <div className="genres-page">
            {(recipesData ? recipesData : []).map((recipe, itemIndex) => (
                <CategoryCarousel
                    sectionName={recipe.name}
                    key={`${recipe.name}-${itemIndex}`}
                    items={recipe.recipes}
                    itemsInOneSlider={5}
                    isLoading={isLoading}
                    updateSavedRecipes={updateSavedRecipe}
                    className="recommended-recipes-carousel"
                />
            ))}
        </div>
    );
};
