import "./BookmarkButton.css";

import { Rating, RatingProps } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { FC } from "react";
import classNames from "classnames";

interface Props {
    onChange: (isToggled: boolean) => void;
    value: boolean;
    size?: RatingProps["size"];
    className?: string;
}

export const BookmarkButton: FC<Props> = ({ onChange, value, size, className }) => {
    return (
        <Rating
            className={classNames("eatin-bookmark-button", className)}
            max={1}
            value={!value ? 0 : 1}
            size={size}
            onChange={(event, value) => onChange(!!value)}
            icon={<BookmarkIcon fontSize="inherit" />}
            emptyIcon={<BookmarkBorderIcon fontSize="inherit" />}
        />
    );
};
