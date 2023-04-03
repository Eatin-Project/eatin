import "./RecipeItem.css";

import { FC } from "react";
import { Recipe } from "../types";
import { RecipeItemOverlay } from "./RecipeItemOverlay";
import { NavigateFunction, useNavigate } from "react-router";

type Props = {
    recipe: Recipe;
};

export const RecipeItem: FC<Props> = ({ recipe }) => {
    const navigate: NavigateFunction = useNavigate();
    const navigateToRecipePage = () => {
        navigate(`/recipe/${recipe.index}`);
    };
    return (
        <div className="recipe-item" onClick={navigateToRecipePage}>
            <RecipeItemOverlay
                rating={recipe.rating}
                vote_count={recipe.vote_count}
                index={recipe.index}
                recipe_title={recipe.recipe_title}
            />
            <img src={recipe.image}></img>
        </div>
    );
};
