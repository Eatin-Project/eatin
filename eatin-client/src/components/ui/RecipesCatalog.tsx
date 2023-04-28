import "./RecipesCatalog.css";

import { FC } from "react";
import { Recipe } from "../types";
import { RecipeItem } from "./RecipeItem";

type Props = {
    recipes: Recipe[];
    specificSavedUpdateFunc: (isSaved: boolean, recipeIndex: number) => void;
};

export const RecipesCatalog: FC<Props> = ({ recipes, specificSavedUpdateFunc }) => {
    return (
        <div className="recipes-catalog">
            {recipes.map((recipe) => (
                <RecipeItem
                    recipe={recipe}
                    key={recipe.index}
                    updateSavedRecipes={specificSavedUpdateFunc}
                />
            ))}
        </div>
    );
};
