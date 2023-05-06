import "./RecipePage.css";
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateRatingMutation,
    useGetRatingByRecipeAndUserQuery,
    useGetRecipeByIdQuery,
    useGetUserrecipesByRecipeAndUserQuery,
} from "../../generated/graphql";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useAuth } from "../../context/auth-context";
import { useToastNotification } from "../../components/functions/useToastNotification";
import { useGetSimilarRecipes } from "../../graphql/queries/similar_recipes.query";
import styled from "styled-components";
import { Rating } from "@mui/material";
import { Recipe } from "../../components/types";
import { redRatingStyle } from "../../components/ui/rating-styles";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useInsertNewUserRecipe } from "../../components/functions/useInsertNewUserRecipe";
import { useDeleteUserRecipe } from "../../components/functions/useDeleteUserRecipe";

export const RecipePage: FC = () => {
    const { id } = useParams();
    const [rating, setRating] = useState<number | null>(0);
    const { currentUser } = useAuth();
    const { notify } = useToastNotification();
    const navigate = useNavigate();
    const { data: ratingData, loading: ratingLoading } = useGetRatingByRecipeAndUserQuery({
        variables: { id: currentUser ? currentUser?.uid : "", index: Number(id) },
    });
    const { data: recipeData, loading: recipeLoading } = useGetRecipeByIdQuery({
        variables: { index: Number(id), userID: currentUser ? currentUser.uid : "" },
    });
    const { data: isRecipeSaved, loading: recipeSavedLoading } =
        useGetUserrecipesByRecipeAndUserQuery({
            variables: { recipeID: Number(id), userID: currentUser ? currentUser?.uid : "" },
        });
    const [isSaved, setIsSaved] = useState(false);
    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSimilarRecipes(
        Number(id),
        currentUser ? currentUser.uid : "",
    );

    const { insertNewUserRecipe } = useInsertNewUserRecipe();
    const { deleteNewUserRecipe } = useDeleteUserRecipe();
    const recipe = useMemo(() => recipeData?.recipe, [recipeData?.recipe]);
    const [createRating] = useCreateRatingMutation();

    useEffect(() => {
        setRating(ratingData ? ratingData.ratingByUserAndRecipe.rating : 0);
        setIsSaved(!!isRecipeSaved);
    }, [isRecipeSaved, ratingData]);

    if (recipeLoading || ratingLoading || recipeSavedLoading)
        return <AsyncDataLoaderWrapper loading text="loading recipe page..." />;
    if (!recipe) return <h2>Recipe does not exist :)</h2>;

    function insertNewRating(newValue: number | null) {
        if (!!newValue && currentUser?.uid) {
            createRating({
                variables: {
                    user_id: currentUser?.uid,
                    recipe_index: Number(id),
                    rating: newValue,
                },
            }).then((rating) => console.log(rating.data));
        }
    }

    const handleBookmarkClicked = (event: any) => {
        event.stopPropagation();
        if (isSaved) {
            deleteNewUserRecipe(Number(id));
            notify(`${recipe.recipe_title}, was removed`);
        } else {
            insertNewUserRecipe(Number(id), true);
            notify(`${recipe.recipe_title}, was saved`);
        }
        setIsSaved(!isSaved);
    };

    const updateRating = (newValue: number | null) => {
        setRating(newValue);
        insertNewRating(newValue);
        notify(`You have given a rating of ${newValue} to the recipe ${recipe.recipe_title}`);
    };

    return (
        <PageWrapper>
            <LeftSection>
                <RecipeImage src={recipe.image}></RecipeImage>
                <AsyncDataLoaderWrapper
                    loading={recommendedRecipesLoading}
                    text="loading similar recipes..."
                    spinnerHeight={"20%"}
                    spinnerSize={"4em"}
                >
                    <SimilarRecipes>
                        <SimilarRecipesTitle>{recommendedRecipes[0]?.name}</SimilarRecipesTitle>
                        <Scrollable>
                            {recommendedRecipes[0]?.recipes.map((similarRecipe: Recipe) => (
                                <SimilarRecipe>
                                    <SmallImageWrapper>
                                        <SimilarRecipeImage
                                            src={similarRecipe.image}
                                        ></SimilarRecipeImage>
                                    </SmallImageWrapper>
                                    <SimilarRecipeDataWrapper>
                                        <SRTitle
                                            onClick={() =>
                                                navigate("/recipe/" + similarRecipe.index)
                                            }
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
            <RightSection>
                <TitleContainer>
                    <RecipeBookmarkIcon
                        sx={{ color: isSaved ? "#E14026" : "#B0B0B0" }}
                        onClick={(event) => handleBookmarkClicked(event)}
                    />
                    <RecipeTitle>{recipe.recipe_title}</RecipeTitle>
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
                <RecipeDescription>{recipe.description}</RecipeDescription>
                <Separator />
                <RecipeContentTitle>INGREDIENTS</RecipeContentTitle>
                <RecipeContentList>
                    <ul className="ingredients-list">
                        {_parseStringArray(recipe.ingredients).map((ingredient, i) => (
                            <li key={`${ingredient}-${i}`}>{ingredient}</li>
                        ))}
                    </ul>
                </RecipeContentList>
                <RecipeContentTitle>INSTRUCTIONS</RecipeContentTitle>
                <RecipeContentList>
                    <ul>
                        {_parseStringArray(recipe.instructions).map((instruction, i) => (
                            <li key={`${instruction}-${i}`}>{instruction}</li>
                        ))}
                    </ul>
                </RecipeContentList>
                <Separator />
            </RightSection>
        </PageWrapper>
    );
};

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

const SmallImageWrapper = styled.div`
    width: 40%;
`;

const SimilarRecipeDataWrapper = styled.div`
    width: 60%;
    text-align: left;
    margin: 0 0 0 0.5em;
`;

const SimilarRecipeImage = styled.img`
    border-radius: 50%;
    width: 6em;
    height: 6em;
    object-fit: cover;
`;

const RecipeImage = styled.img`
    border-radius: 50%;
    width: 15em;
    height: 15em;
    object-fit: cover;
`;

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

const SimilarRecipe = styled.div`
    display: flex;
    margin: 1.5em 0 0 0;
`;

const SimilarRecipes = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5em 0 0 0;
    max-height: 100vh;
`;

const PageWrapper = styled.div`
    display: flex;
    width: 95vw;
    margin: 3em auto 2em 2em;
`;

const LeftSection = styled.div`
    width: 20%;
    justify-content: center;
`;

const RightSection = styled.div`
    width: 80%;
    margin-left: 1em;
    text-align: left;
`;

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

const comments = [
    { user: "shirley", content: "looks great!!" },
    { user: "shirley", content: "cooked this at home, it was amazing!" },
    { user: "shirley", content: "too much suger for me" },
    { user: "shirley", content: "super tasty" },
    { user: "shirley", content: "looks great!!!" },
    {
        user: "shirley",
        content: `This cake is rich and wholesome at the same time. Once you have tasted it, you will want to make an extra one and save it for New Year's as well!`,
    },
];
