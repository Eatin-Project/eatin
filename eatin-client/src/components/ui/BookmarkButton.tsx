import "./BookmarkButton.css";

import { Rating, RatingProps } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FC } from "react";
import classNames from "classnames";

import { useInsetNewUserRecipe } from "../functions/insertNewUserRecipe";
import { useDeleteUserRecipe } from "../functions/deleteNewUserRecipe";
import { useToastNotification } from "../functions/useToastNotification";

interface Props {
    onChange: (isToggled: boolean) => void;
    value: boolean;
    size?: RatingProps["size"];
    className?: string;
    recipeID: number;
    recipeName: string;
}

export const BookmarkButton: FC<Props> = ({
    onChange,
    value,
    size,
    className,
    recipeID,
    recipeName,
}) => {
    const { insertNewUserRecipe } = useInsetNewUserRecipe();
    const { deleteNewUserRecipe } = useDeleteUserRecipe();
    const { notify } = useToastNotification();

    const changeRecipeSavedState = (value: boolean) => {
        if (value) {
            insertNewUserRecipe(recipeID, true);
            notify(`${recipeName}, was saved!`);
        } else {
            deleteNewUserRecipe(recipeID);
            notify(`${recipeName}, was removed...`);
        }
        onChange(!!value);
    };

    return (
        <div>
            <Rating
                className={classNames("eatin-bookmark-button", className)}
                max={1}
                value={!value ? 0 : 1}
                size={size}
                onChange={(event, value) => changeRecipeSavedState(!!value)}
                icon={<BookmarkIcon fontSize="inherit" />}
                emptyIcon={<BookmarkBorderIcon fontSize="inherit" />}
            />
        </div>
    );
};
