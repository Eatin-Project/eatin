import "./RecommendedFeed.css";
import "react-toastify/dist/ReactToastify.css";

import { FC } from "react";
import { CategoryCarousel } from "./CategoryCarousel";
import { RecipesSection } from "../../components/types";

interface Props {
    currentRecipes: RecipesSection[];
    updateSavedStateInRecipesSection: (isSaved: boolean, recipeIndex: number) => void;
    isLoadingCurrentRecipes: boolean;
}

export const RecommendedFeed: FC<Props> = ({
    currentRecipes,
    updateSavedStateInRecipesSection,
    isLoadingCurrentRecipes,
}) => {
    return (
        <div className="feed">
            {currentRecipes.map((recipe, itemIndex) => (
                <CategoryCarousel
                    key={`${recipe.name}-${itemIndex}`}
                    items={recipe.recipes}
                    title={recipe.name}
                    itemsInOneSlider={5}
                    isLoading={isLoadingCurrentRecipes}
                    updateSavedRecipes={updateSavedStateInRecipesSection}
                    className="recommended-recipes-carousel"
                />
            ))}
        </div>
    );
};
