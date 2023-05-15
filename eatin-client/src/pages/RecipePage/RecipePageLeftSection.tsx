import { FC, useEffect } from "react";
import { Recipe, RecipesSection } from "../../components/types";
import styled from "styled-components";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";
import { redRatingStyle } from "../../components/ui/rating-styles";

interface Props {
    shownRecipe: Recipe;
    recommentedRecipes: RecipesSection;
    loading: boolean;
}

export const RecipePageLeftSection: FC<Props> = ({ shownRecipe, recommentedRecipes, loading }) => {
    const navigate = useNavigate();

    return (
        <LeftSection>
            <RecipeImage src={shownRecipe?.image}></RecipeImage>
            <AsyncDataLoaderWrapper
                loading={loading}
                text="loading similar recipes..."
                spinnerHeight={"20%"}
                spinnerSize={"4em"}
            >
                <SimilarRecipes>
                    <SimilarRecipesTitle>{recommentedRecipes?.name}</SimilarRecipesTitle>
                    <Scrollable>
                        {recommentedRecipes?.recipes.map((similarRecipe: Recipe, i) => (
                            <SimilarRecipe key={i}>
                                <SmallImageWrapper>
                                    <SimilarRecipeImage
                                        src={similarRecipe.image}
                                    ></SimilarRecipeImage>
                                </SmallImageWrapper>
                                <SimilarRecipeDataWrapper>
                                    <SRTitle
                                        onClick={() => navigate("/recipe/" + similarRecipe.index)}
                                    >
                                        {similarRecipe.recipe_title}
                                    </SRTitle>
                                    <SRRating>
                                        <Rating
                                            sx={redRatingStyle}
                                            className="recipe-rating"
                                            size="small"
                                            value={similarRecipe.rating}
                                            precision={0.5}
                                            readOnly
                                        />
                                    </SRRating>
                                </SimilarRecipeDataWrapper>
                            </SimilarRecipe>
                        ))}
                    </Scrollable>
                </SimilarRecipes>
            </AsyncDataLoaderWrapper>
        </LeftSection>
    );
};

const SimilarRecipeImage = styled.img`
    border-radius: 50%;
    width: 6em;
    height: 6em;
    object-fit: cover;
`;

const SmallImageWrapper = styled.div`
    width: 40%;
`;

const SRTitle = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-decoration-line: underline;
    cursor: pointer;
    color: #263238;
`;

const SRRating = styled.div``;

const SimilarRecipesTitle = styled.div`
    color: #263238;
    font-size: 15px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0;
    text-align: left;
`;

const Scrollable = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const SimilarRecipeDataWrapper = styled.div`
    width: 60%;
    text-align: left;
    margin: 0 0 0 0.5em;
`;

const LeftSection = styled.div`
    width: 20%;
    justify-content: center;
`;

const RecipeImage = styled.img`
    border-radius: 50%;
    width: 15em;
    height: 15em;
    object-fit: cover;
`;

const SimilarRecipes = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5em 0 0 0;
    max-height: 100vh;
`;

const SimilarRecipe = styled.div`
    display: flex;
    margin: 1.5em 0 0 0;
`;
