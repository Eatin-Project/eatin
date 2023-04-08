import "./catalog.css";

import { FC } from "react";
import { Recipe } from "../types";
import { useAddIsSavedToRecipesList } from "../functions/useAddIsSavedToRecipesList";
import { RecipeItem } from "../ui/RecipeItem";

type Props = {
    recipes?: Recipe[];
};

export const Catalog: FC<Props> = ({ recipes }) => {
    const { recipesWithIsSaved, updateIsSaved } = useAddIsSavedToRecipesList(
        recipes ? recipes : [],
    );

    return (
        <div className="recipes-catalog">
            {recipesWithIsSaved?.map((recipe) => (
                <RecipeItem
                    recipe={recipe}
                    key={recipe.index}
                    updateSavedRecipes={updateIsSaved}
                ></RecipeItem>
            ))}
        </div>
    );
};
