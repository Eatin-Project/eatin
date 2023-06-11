import { FC } from "react";
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { redRatingStyle } from "../../components/ui/rating-styles";
import { Rating } from "@mui/material";
import { Recipe } from "../../components/types";
import { CommentsSection } from "./comments/CommentsSection";
import { parseStringArray } from "../../components/functions/stringFunctions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
    shownRecipe: Recipe;
    bookmarkClicked: () => void;
    updateRating: (newValue: number | null) => void;
    rating: number | null;
    isSaved: boolean;
    isUploaded: boolean;
}

export const RecipePageRightSection: FC<Props> = ({
    shownRecipe,
    bookmarkClicked,
    updateRating,
    rating,
    isSaved,
    isUploaded,
}) => {
    return (
        <RightSection>
            <TitleContainer>
                {!isUploaded ? (
                    <RecipeBookmarkIcon
                        sx={{ color: isSaved ? "#E14026" : "#B0B0B0" }}
                        onClick={(event) => {
                            event.stopPropagation();
                            bookmarkClicked();
                        }}
                    />
                ) : null}
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
            <RecipeMetadata>
                <MetadataIcon>
                    <AccessTimeIcon />
                </MetadataIcon>
                <MetadataItem>
                    <MetadataItemTitle>Prep In</MetadataItemTitle>
                    <div>{shownRecipe?.prep_time} M</div>
                </MetadataItem>
                <MetadataItem>
                    <MetadataItemTitle>Cook In</MetadataItemTitle>
                    <div>{shownRecipe?.cook_time} M</div>
                </MetadataItem>
                <MetadataItem>
                    <MetadataItemTitle>Total In</MetadataItemTitle>
                    <div>{shownRecipe?.total_time} M</div>
                </MetadataItem>
                <MetadataIcon>
                    <RestaurantIcon />
                </MetadataIcon>
                <MetadataItem>
                    <MetadataItemTitle>Cuisine</MetadataItemTitle>
                    <div>{shownRecipe?.cuisine}</div>
                </MetadataItem>
                <MetadataItem>
                    <MetadataItemTitle>Diet</MetadataItemTitle>
                    <div>{shownRecipe?.diet}</div>
                </MetadataItem>
                <MetadataItem>
                    <MetadataItemTitle>Course</MetadataItemTitle>
                    <div>{shownRecipe?.course}</div>
                </MetadataItem>
                <MetadataIcon>
                    <FitnessCenterIcon />
                </MetadataIcon>
                <MetadataItem>
                    <MetadataItemTitle>Difficulty</MetadataItemTitle>
                    <div>{shownRecipe?.difficulty}</div>
                </MetadataItem>
                <MetadataIcon>
                    <FavoriteIcon />
                </MetadataIcon>
                <MetadataItem>
                    <MetadataItemTitle>Health</MetadataItemTitle>
                    <div>{shownRecipe?.record_health}</div>
                </MetadataItem>
            </RecipeMetadata>
            <Separator />
            <RecipeContentTitle>INGREDIENTS</RecipeContentTitle>
            <RecipeContentList>
                <ul className="ingredients-list">
                    {parseStringArray(shownRecipe?.ingredients).map((ingredient, i) => (
                        <li key={`${ingredient}-${i}`}>{ingredient}</li>
                    ))}
                </ul>
            </RecipeContentList>
            <RecipeContentTitle>INSTRUCTIONS</RecipeContentTitle>
            <RecipeContentList>
                <ul>
                    {parseStringArray(shownRecipe?.instructions).map((instruction, i) => (
                        <li key={`${instruction}-${i}`}>{instruction}</li>
                    ))}
                </ul>
            </RecipeContentList>
            <Separator />
            <CommentsSection recipeIndex={shownRecipe?.index}></CommentsSection>
        </RightSection>
    );
};

const MetadataIcon = styled.div`
    margin: 0 2em 0 2em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const MetadataItemTitle = styled.div`
    font-size: 0.85em;
`;

const MetadataItem = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 2em 0 0;
    justify-content: center;
    text-align: center;
`;

const RecipeMetadata = styled.div`
    display: flex;
    flex-direction: row;
`;

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

export const Separator = styled.div`
    border: 0.5px solid #d9d9d9b0;
    margin: 1em 0 1em 0;
    backdrop-filter: blur(2px);
    width: 100%;
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
