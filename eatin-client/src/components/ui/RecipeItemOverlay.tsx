import "./RecipeItemOverlay.css";

import { Button, Rating } from "@mui/material";
import { FC, useState } from "react";
import { Recipe } from "../types";
import CancelIcon from "@mui/icons-material/Cancel";
import { BookmarkButton } from "./BookmarkButton";

type Props = Pick<Recipe, "rating" | "vote_count" | "index" | "recipe_title" | "is_saved"> & {
    updateSavedRecipes: (isSaved: boolean, recipeIndex: number) => void;
};

export const RecipeItemOverlay: FC<Props> = ({
    rating,
    vote_count,
    index,
    recipe_title,
    is_saved,
    updateSavedRecipes,
}) => {
    const [userRating, setUserRating] = useState<number | null>(null);

    return (
        <div
            className="recipe-item-overlay"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="buttons-spread p-0">
                <Button className="delete-from-list p-0" size="large">
                    <CancelIcon className="delete-from-list-icon p-0" />
                </Button>
                <BookmarkButton
                    onChange={(value) => updateSavedRecipes(value, index)}
                    recipeID={index}
                    recipeName={recipe_title}
                    isClicked={is_saved ? true : false}
                    className="is-saved"
                ></BookmarkButton>
            </div>
            <div className="item-info">
                <Rating
                    className="rating-item"
                    precision={0.5}
                    value={userRating ?? rating}
                    onChange={(e, value) => setUserRating(value)}
                    readOnly
                    max={5}
                />
                <span className="viewed-number">{vote_count}</span>
            </div>
        </div>
    );
};
