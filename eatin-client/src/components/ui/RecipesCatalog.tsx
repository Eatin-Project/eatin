import "./RecipesCatalog.css";

import { FC } from "react";
import { Recipe } from "../types";
import { RecipeItem } from "./RecipeItem";
import { useAddIsSavedToRecipesList } from "../functions/useAddIsSavedToRecipesList";

type Props = {
    recipes: Recipe[];
};

export const RecipesCatalog: FC<Props> = ({ recipes }) => {
    const { recipesWithIsSaved, updateIsSaved } = useAddIsSavedToRecipesList(
        recipes ? recipes : [],
    );

    return (
        <div className="recipes-catalog">
            {recipesWithIsSaved?.map((recipe) => (
                <RecipeItem recipe={recipe} key={recipe.index} updateSavedRecipes={updateIsSaved} />
            ))}
        </div>
    );
};
