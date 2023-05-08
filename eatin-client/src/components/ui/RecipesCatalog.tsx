import "./RecipesCatalog.css";

import { FC } from "react";
import { Recipe } from "../types";
import { RecipeItem } from "./RecipeItem";

type Props = {
    recipes: Recipe[];
};

export const RecipesCatalog: FC<Props> = ({ recipes }) => {
    const updatedRecipesSavedState = (recipeIndex: number) => {
        const index = recipes.findIndex((item) => item.index === recipeIndex);
        recipes[index].is_saved = !recipes[index].is_saved;
    };

    return (
        <div className="recipes-catalog">
            {recipes.map((recipe) => (
                <RecipeItem
                    recipe={recipe}
                    key={recipe.index}
                    updateSavedRecipes={updatedRecipesSavedState}
                />
            ))}
        </div>
    );
};
