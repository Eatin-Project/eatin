import "./RecommendedFeed.css";

import { FC, useState } from "react";

import { CategoryCarousel } from "./CategoryCarousel";
import { Recipe } from "../../components/types";

interface Props {
    currentRecipes: { name: string; items: Recipe[] }[];
}

export const RecommendedFeed: FC<Props> = ({ currentRecipes }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="genres-page">
            {currentRecipes.map((recipe, itemIndex) => (
                <CategoryCarousel
                    key={`${recipe.name}-${itemIndex}`}
                    title={recipe.name}
                    items={recipe.items}
                    itemsInOneSlider={3}
                    isLoading={isLoading}
                    className="recommended-recipes-carousel"
                />
            ))}
        </div>
    );
};
