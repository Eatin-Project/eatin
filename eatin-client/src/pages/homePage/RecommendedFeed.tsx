import "./RecommendedFeed.css";

import { FC, useState } from "react";

import { CategoryCarousel } from "./CategoryCarousel";
import {Recipe, RecipesSection} from "../../components/types";

interface Props {
    currentRecipes: RecipesSection[];
}

export const RecommendedFeed: FC<Props> = ({ currentRecipes }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="genres-page">
            {currentRecipes.map((recipe, itemIndex) => (
                <CategoryCarousel
                    key={`${recipe.name}-${itemIndex}`}
                    title={recipe.name}
                    items={recipe.recipes}
                    itemsInOneSlider={4}
                    isLoading={isLoading}
                    className="recommended-recipes-carousel"
                />
            ))}
        </div>
    );
};
