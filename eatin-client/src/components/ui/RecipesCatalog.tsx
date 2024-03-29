import "./RecipesCatalog.css";

import { FC } from "react";
import { Recipe } from "../types";
import { CarouselItem } from "./CarouselItem";
import { useNavigate } from "react-router-dom";

type Props = {
    recipes: Recipe[];
};

export const RecipesCatalog: FC<Props> = ({ recipes }) => {
    const updatedRecipesSavedState = (recipeIndex: number) => {
        const index = recipes.findIndex((item) => item.index === recipeIndex);
        recipes[index].is_saved = !recipes[index].is_saved;
    };

    const navigate = useNavigate();

    return (
        <div className="recipes-catalog">
            {recipes.map((recipe) => (
                <CarouselItem
                    id={recipe.index}
                    isSaved={recipe.is_saved}
                    isUploaded={recipe.is_uploaded}
                    key={recipe.index}
                    updatedRecipesSavedState={updatedRecipesSavedState}
                    onClick={(id: number) => navigate("/recipe/" + id)}
                    image={recipe.image}
                    rating={recipe.rating}
                    title={recipe.recipe_title}
                />
            ))}
        </div>
    );
};
