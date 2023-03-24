import "./RecipeItem.css";

import { FC } from "react";
import { Recipe } from "../types";
import { RecipeItemOverlay } from "./RecipeItemOverlay";

type Props = {
    recipe: Recipe;
};

export const RecipeItem: FC<Props> = ({ recipe }) => {
    return (
        <div className="recipe-item">
            <RecipeItemOverlay rating={recipe.rating} vote_count={recipe.vote_count} />
            <img src={recipe.image}></img>
        </div>
    );
};
