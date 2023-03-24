import "./RecipeItemOverlay.css";

import { Button, Rating } from "@mui/material";
import { FC, useState } from "react";
import { Recipe } from "../types";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = Pick<Recipe, "rating" | "vote_count">;

export const RecipeItemOverlay: FC<Props> = ({ rating, vote_count }) => {
    const [userRating, setUserRating] = useState<number | null>(null);

    return (
        <div
            className="recipe-item-overlay"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="buttons-spread">
                <Rating className="is-saved" max={1} />
                <Button className="delete-from-list" size="large">
                    <CancelIcon className="delete-from-list-icon" />
                </Button>
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
