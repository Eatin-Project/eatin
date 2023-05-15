import { FC } from "react";
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { redRatingStyle } from "../../components/ui/rating-styles";
import { Rating } from "@mui/material";
import { Recipe } from "../../components/types";

interface Props {
    shownRecipe: Recipe;
    bookmarkClicked: () => void;
    updateRating: (newValue: number | null) => void;
    rating: number | null;
    isSaved: boolean;
}
export const RecipePageRightSection: FC<Props> = ({
    shownRecipe,
    bookmarkClicked,
    updateRating,
    rating,
    isSaved,
}) => {
    const _parseStringArray = (str: string | undefined): string[] => {
        if (!str) return [];

        try {
            return JSON.parse(
                "[" +
                    str
                        .substring(1, str.length - 1)
                        .replaceAll('\\"', '"')
                        .replaceAll(",/ ", "") +
                    "]",
            );
        } catch (e) {
            return ["problem parsing string to json", "fix is coming soon! :D"];
        }
    };

    return (
        <RightSection>
            <TitleContainer>
                <RecipeBookmarkIcon
                    sx={{ color: isSaved ? "#E14026" : "#B0B0B0" }}
                    onClick={(event) => {
                        event.stopPropagation();
                        bookmarkClicked();
                    }}
                />
                <RecipeTitle>{shownRecipe?.recipe_title}</RecipeTitle>
            </TitleContainer>
            <RecipeRating>
                <Rating
                    sx={redRatingStyle}
                    className="recipe-rating"
                    size="small"
                    value={rating}
                    onChange={(event, newValue) => {
                        updateRating(newValue);
                    }}
                    precision={0.5}
                />
            </RecipeRating>
            <RecipeDescription>{shownRecipe?.description}</RecipeDescription>
            <Separator />
            <RecipeContentTitle>INGREDIENTS</RecipeContentTitle>
            <RecipeContentList>
                <ul className="ingredients-list">
                    {_parseStringArray(shownRecipe?.ingredients).map((ingredient, i) => (
                        <li key={`${ingredient}-${i}`}>{ingredient}</li>
                    ))}
                </ul>
            </RecipeContentList>
            <RecipeContentTitle>INSTRUCTIONS</RecipeContentTitle>
            <RecipeContentList>
                <ul>
                    {_parseStringArray(shownRecipe?.instructions).map((instruction, i) => (
                        <li key={`${instruction}-${i}`}>{instruction}</li>
                    ))}
                </ul>
            </RecipeContentList>
            <Separator />
        </RightSection>
    );
};

const RightSection = styled.div`
    width: 80%;
    margin-left: 1em;
    text-align: left;
`;

const RecipeBookmarkIcon = styled(BookmarkIcon)`
    margin: 0.2rem 0.1rem 0 0;
    cursor: pointer;

    &:hover {
        color: #e14026;
        transition: 0.2s;
    }
`;

const RecipeContentList = styled.div`
    font-weight: 350;
    font-size: 14px;
    line-height: 21px;
    font-style: normal;
`;

const RecipeContentTitle = styled.div`
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
    font-style: normal;
    margin-bottom: 0.5em;
`;

const Separator = styled.div`
    border: 0.5px solid #d9d9d9b0;
    margin: 1em 0 1em 0;
    backdrop-filter: blur(2px);
`;

const RecipeRating = styled.div`
    display: flex;
`;

const TitleContainer = styled.div`
    display: flex;
`;

const RecipeTitle = styled.div`
    color: #263238;
    font-size: 23px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0;
`;

const RecipeDescription = styled.div`
    height: fit-content;
    font-style: italic;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
`;
