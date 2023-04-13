import "./BookmarkButton.css";

import { Rating, RatingProps } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FC } from "react";
import classNames from "classnames";

import { useInsertNewUserRecipe } from "../functions/useInsertNewUserRecipe";
import { useDeleteUserRecipe } from "../functions/useDeleteUserRecipe";
import { useToastNotification } from "../functions/useToastNotification";

interface Props {
    onChange: (isToggled: boolean) => void;
    isClicked: boolean;
    size?: RatingProps["size"];
    className?: string;
    recipeID: number;
    recipeName: string;
}

export const BookmarkButton: FC<Props> = ({
    onChange,
    isClicked,
    size,
    className,
    recipeID,
    recipeName,
}) => {
    const { insertNewUserRecipe } = useInsertNewUserRecipe();
    const { deleteNewUserRecipe } = useDeleteUserRecipe();
    const { notify } = useToastNotification();

    const changeRecipeSavedState = (wasClicked: boolean) => {
        if (wasClicked) {
            insertNewUserRecipe(recipeID, true);
            notify(`${recipeName}, was saved!`);
        } else {
            deleteNewUserRecipe(recipeID);
            notify(`${recipeName}, was removed...`);
        }
        onChange(!!wasClicked);
    };

    return (
        <div>
            <Rating
                className={classNames("eatin-bookmark-button", className)}
                max={1}
                value={!isClicked ? 0 : 1}
                size={size}
                onChange={(event, value) => changeRecipeSavedState(!!value)}
                icon={<BookmarkIcon fontSize="inherit" />}
                emptyIcon={<BookmarkBorderIcon fontSize="inherit" />}
            />
        </div>
    );
};
