import "./RecipeItemOverlay.css";

import { Button, Rating } from "@mui/material";
import { FC, useRef, useState } from "react";
import { toast, Id } from "react-toastify";
import { Recipe } from "../types";
import CancelIcon from "@mui/icons-material/Cancel";
import { BookmarkButton } from "./BookmarkButton";
import { ToastNotification } from "./ToastNotification";
import { useDeleteUserRecipe, useInsetNewUserRecipe } from "../functions/userRecipesFunc";

type Props = Pick<Recipe, "rating" | "vote_count" | "index" | "recipe_title" | "is_saved"> & {
    updateSavedRecipes?: (isSaved: boolean, recipeIndex: number, sectionName: string) => void;
    sectionName?: string;
};

export const RecipeItemOverlay: FC<Props> = ({
    rating,
    vote_count,
    index,
    recipe_title,
    is_saved,
    sectionName,
    updateSavedRecipes,
}) => {
    const [userRating, setUserRating] = useState<number | null>(null);
    const currentSavedToastID = useRef<Id | undefined>(undefined);
    const { insertNewUserRecipe } = useInsetNewUserRecipe();
    const { deleteNewUserRecipe } = useDeleteUserRecipe();

    const changeRecipeSavedState = (recipeID: number, recipeName: string, value: boolean) => {
        if (currentSavedToastID) {
            toast.dismiss(currentSavedToastID.current);
        }
        if (value) {
            insertNewUserRecipe(recipeID, true);
            currentSavedToastID.current = toast(`${recipeName}, was saved!`);
        } else {
            deleteNewUserRecipe(recipeID);
            currentSavedToastID.current = toast(`${recipeName}, was removed...`);
        }
        if (updateSavedRecipes && sectionName) updateSavedRecipes(value, recipeID, sectionName);
    };

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
                    onChange={(value) => changeRecipeSavedState(index, recipe_title, value)}
                    value={is_saved ? true : false}
                    className="is-saved"
                ></BookmarkButton>
                <ToastNotification />
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
