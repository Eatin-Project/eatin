import "./Carousel.css";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Rating } from "@mui/material";
import { whiteRatingStyle } from "./rating-styles";
import { useInsertNewUserRecipe } from "../functions/useInsertNewUserRecipe";
import { useToastNotification } from "../functions/useToastNotification";
import { useUpdateUserRecommendations } from "../../graphql/queries/update_user_recommendations.query";
import { useGetUsersName } from "../hooks/useGetUsersName";

export interface ICarouselItem<T = unknown> {
    id: number;
    image: string;
    itemValue?: T;
    title?: string;
    rating: number;
    isSaved: boolean | undefined;
    isUploaded: boolean;
    updatedRecipesSavedState: (recipeIndex: number) => void;
}

export type CarouselItemProps = ICarouselItem & {
    onClick?: (id: number) => void;
};

export const CarouselItem: FC<CarouselItemProps> = ({
    id,
    image,
    onClick,
    rating,
    isSaved,
    isUploaded,
    updatedRecipesSavedState,
    title,
}) => {
    const userID = useGetUsersName();
    const handleClick = useCallback(() => onClick?.(id), [id, onClick]);
    const [isRecipeSaved, setIsRecipeSaved] = useState(isSaved);
    const { updateIsSaved } = useInsertNewUserRecipe(id);
    const { notify } = useToastNotification();
    const [updateRecommendations, setUpdateRecommendations] = useState<Boolean>(false);
    const {} = useUpdateUserRecommendations(
        userID,
        updateRecommendations,
        setUpdateRecommendations,
    );

    const handleBookmarkClicked = (event: any) => {
        event.stopPropagation();
        if (isRecipeSaved) {
            updateIsSaved(false);
            notify(`${title}, was removed`);
        } else {
            updateIsSaved(true);
            notify(`${title}, was saved`);
        }
        updatedRecipesSavedState(id);
        setUpdateRecommendations(true);
        setIsRecipeSaved(!isRecipeSaved);
    };

    return (
        <CarouselItemWrapper onClick={handleClick}>
            <CarouselItemImageWrapper>
                {!isUploaded ? (
                    <RecipeBookmarkIcon
                        sx={{ color: isRecipeSaved ? "#E14026" : "#B0B0B0" }}
                        onClick={(event) => handleBookmarkClicked(event)}
                    />
                ) : null}
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
    margin: 6.2em 0 0 0.5em;
    border-radius: 19.5px;
    background-color: #e14026;
    display: flex;
`;

const RecipeRating = styled(Rating)`
    margin: 0.1em 0.2em 0.1em 0.2em;
`;

const RecipeBookmarkIcon = styled(BookmarkIcon)`
    position: absolute;
    margin: -0.3em 0 0 0.8em;

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
    font-size: 13px;
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
    margin: 0.2em 0.5em 0.9em;
    justify-content: flex-start;
    position: relative;
    cursor: pointer;
`;
