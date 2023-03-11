import "./BookmarkButton.css";

import { Rating, RatingProps } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { FC } from "react";

interface Props {
    onChange: (isToggled: boolean) => void;
    value: boolean;
    size?: RatingProps["size"];
}

export const BookmarkButton: FC<Props> = ({ onChange, value, size }) => {
    return (
        <Rating
            className="eatin-bookmark-button"
            max={1}
            value={!value ? 0 : 1}
            size={size}
            onChange={(event, value) => onChange(!!value)}
            icon={<BookmarkIcon fontSize="inherit" />}
            emptyIcon={<BookmarkBorderIcon fontSize="inherit" />}
        />
    );
};
