import "./RecipeItemOverlay.css";

import { Button, Rating } from "@mui/material";
import { FC, useRef, useState } from "react";
import { ToastContainer, toast, Id, Zoom } from "react-toastify";
import { Recipe } from "../types";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = Pick<Recipe, "rating" | "vote_count" | "index" | "recipe_title">;

export const RecipeItemOverlay: FC<Props> = ({ rating, vote_count, index, recipe_title }) => {
    const [userRating, setUserRating] = useState<number | null>(null);
    const currentSavedToastID = useRef<Id | undefined>(undefined);

    const changeRecipeSavedState = (recipeID: number, recipeName: string, isSaved: boolean) => {
        if (currentSavedToastID) {
            toast.dismiss(currentSavedToastID.current);
        }

        if (isSaved) {
            currentSavedToastID.current = toast(`${recipeName}, was saved!`);
        } else {
            currentSavedToastID.current = toast(`${recipeName}, was removed...`);
        }
    };

    return (
        <div
            className="recipe-item-overlay"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="buttons-spread p-0">
                <Rating className="is-saved" max={1} />
                <Button className="delete-from-list p-0" size="large">
                    <CancelIcon className="delete-from-list-icon p-0" />
                </Button>
                <Rating
                    className="is-saved"
                    max={1}
                    onChange={(e, value) =>
                        changeRecipeSavedState?.(index, recipe_title, value ? true : false)
                    }
                />
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
