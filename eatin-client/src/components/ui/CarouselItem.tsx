import "./Carousel.css";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Rating } from "@mui/material";
import { whiteRatingStyle } from "./rating-styles";
import { useInsertNewUserRecipe } from "../functions/useInsertNewUserRecipe";
import { useDeleteUserRecipe } from "../functions/useDeleteUserRecipe";
import { useToastNotification } from "../functions/useToastNotification";

export interface ICarouselItem<T = unknown> {
    id: number;
    image: string;
    itemValue?: T;
    title?: string;
    rating: number;
    isSaved: boolean | undefined;
    updateSavedRecipes: (isSaved: boolean, recipeIndex: number) => void;
}

export type CarouselItemProps = ICarouselItem & {
    width: number;
    itemIndex: number;
    randomColors?: boolean;
    onClick?: (id: number) => void;
};

export const CarouselItem: FC<CarouselItemProps> = ({
    width,
    id,
    itemIndex,
    image,
    randomColors,
    onClick,
    rating,
    isSaved,
    updateSavedRecipes,
    itemValue,
    title,
}) => {
    const handleClick = useCallback(() => onClick?.(id), [id, onClick]);
    const [isRecipeSaved, setIsRecipeSaved] = useState(isSaved);
    const { insertNewUserRecipe } = useInsertNewUserRecipe();
    const { deleteNewUserRecipe } = useDeleteUserRecipe();
    const { notify } = useToastNotification();

    const handleBookmarkClicked = (event: any) => {
        event.stopPropagation();
        if (isRecipeSaved) {
            deleteNewUserRecipe(id);
            notify(`${title}, was removed`);
        } else {
            insertNewUserRecipe(id, true);
            notify(`${title}, was saved`);
        }

        setIsRecipeSaved(!isRecipeSaved);
    };

    return (
        <CarouselItemWrapper onClick={handleClick}>
            <CarouselItemImageWrapper>
                <RecipeBookmarkIcon
                    sx={{ color: isRecipeSaved ? "#E14026" : "#B0B0B0" }}
                    onClick={(event) => handleBookmarkClicked(event)}
                />
                <RecipeRatingWrapper>
                    <RecipeRating
                        sx={whiteRatingStyle}
                        size="small"
                        value={rating}
                        precision={0.5}
                        readOnly
                    />
                </RecipeRatingWrapper>
                <CarouselItemImage src={image} />
            </CarouselItemImageWrapper>
            <CarouselItemTitle>{title}</CarouselItemTitle>
        </CarouselItemWrapper>
    );
};

const RecipeRatingWrapper = styled.div`
    position: absolute;
    margin: 6.2em 0 0 9.2em;
    border-radius: 19.5px;
    background-color: #e14026;
    display: flex;
`;

const RecipeRating = styled(Rating)`
    margin: 0.1em 0.2em 0.1em 0.2em;
`;

const RecipeBookmarkIcon = styled(BookmarkIcon)`
    position: absolute;
    margin: -0.3em 0 0 9.1em;

    &:hover {
        color: #e14026;
        transition: 0.2s;
    }
`;

const CarouselItemImageWrapper = styled.div`
    height: 80%;
    width: 100%;
    position: relative;
`;

const CarouselItemTitle = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 15px;
    text-align: left;
    color: #263238;
`;

const CarouselItemImage = styled.img`
    object-fit: cover;
    border-radius: 8px;
    height: 100%;
    width: 100%;
`;

const CarouselItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 19%;
    height: 100%;
    margin: 0.2em 0.5em;
    justify-content: flex-start;
    position: relative;
    cursor: pointer;
`;
