import "./RecipeItem.css";

import { FC } from "react";
import { Recipe } from "../types";
import { RecipeItemOverlay } from "./RecipeItemOverlay";
import { NavigateFunction, useNavigate } from "react-router";

type Props = {
    recipe: Recipe;
    updateSavedRecipes: (isSaved: boolean, recipeIndex: number) => void;
};

export const RecipeItem: FC<Props> = ({ recipe, updateSavedRecipes }) => {
    const navigate: NavigateFunction = useNavigate();
    const navigateToRecipePage = () => {
        navigate(`/recipe/${recipe.index}`);
    };
    return (
        <div className="recipe-item" onClick={navigateToRecipePage}>
            <h2 className="item-name">{recipe.recipe_title}</h2>
            <RecipeItemOverlay
                rating={recipe.rating}
                vote_count={recipe.vote_count}
                index={recipe.index}
                is_saved={recipe.is_saved}
                updateSavedRecipes={updateSavedRecipes}
                recipe_title={recipe.recipe_title}
            />
            <img src={recipe.image} alt={recipe.recipe_title} />
        </div>
    );
};
