import "./RecipePage.css";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useCreateRatingMutation,
    useGetRatingByRecipeAndUserQuery,
    useGetRecipeByIdQuery,
    useGetUserrecipesByRecipeAndUserQuery,
} from "../../generated/graphql";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useToastNotification } from "../../components/functions/useToastNotification";
import { useGetSimilarRecipes } from "../../graphql/queries/similar_recipes.query";
import styled from "styled-components";
import { useInsertNewUserRecipe } from "../../components/functions/useInsertNewUserRecipe";
import { useGetUsersName } from "../../components/hooks/useGetUsersName";
import { useUpdateUserRecommendations } from "../../graphql/queries/update_user_recommendations.query";
import { RecipePageLeftSection } from "./RecipePageLeftSection";
import { RecipePageRightSection } from "./RecipePageRightSection";

export const RecipePage: FC = () => {
    const { id } = useParams();
    const [rating, setRating] = useState<number | null>(0);
    const userID = useGetUsersName();
    const { notify } = useToastNotification();

    const { data: ratingData, loading: ratingLoading } = useGetRatingByRecipeAndUserQuery({
        variables: { id: userID, index: Number(id) },
        fetchPolicy: "no-cache",
    });
    const { data: recipeData, loading: recipeLoading } = useGetRecipeByIdQuery({
        variables: { index: Number(id), userID: userID },
    });
    const { data: isRecipeSaved, loading: recipeSavedLoading } =
        useGetUserrecipesByRecipeAndUserQuery({
            variables: { recipeID: Number(id), userID: userID },
        });
    const [isSaved, setIsSaved] = useState(false);
    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSimilarRecipes(
        Number(id),
        userID,
    );

    const { updateIsSaved } = useInsertNewUserRecipe(Number(id));
    const recipe = useMemo(() => recipeData?.recipe, [recipeData?.recipe]);
    const [createRating] = useCreateRatingMutation();
    const [updateRecommendations, setUpdateRecommendations] = useState<Boolean>(false);
    const {} = useUpdateUserRecommendations(
        userID,
        updateRecommendations,
        setUpdateRecommendations,
    );
    useEffect(() => {
        setRating(
            ratingData?.ratingByUserAndRecipe?.rating ? ratingData.ratingByUserAndRecipe.rating : 0,
        );
        setIsSaved(!!isRecipeSaved?.userRecipesByUserAndRecipe.is_saved);
    }, [isRecipeSaved, ratingData]);

    if (recipeLoading || ratingLoading || recipeSavedLoading)
        return <AsyncDataLoaderWrapper loading text="loading recipe page..." />;
    if (!recipe) return <h2>Recipe does not exist :)</h2>;

    function insertNewRating(newValue: number | null) {
        if (!!newValue && userID.length !== 0) {
            createRating({
                variables: {
                    user_id: userID,
                    recipe_index: Number(id),
                    rating: newValue,
                },
            }).then(() => setUpdateRecommendations(true));
        }
    }

    const handleBookmarkClicked = () => {
        if (isSaved) {
            updateIsSaved(false);
            notify(`${recipe.recipe_title}, was removed`);
        } else {
            updateIsSaved(true);
            notify(`${recipe.recipe_title}, was saved`);
        }
        setUpdateRecommendations(true);
        setIsSaved(!isSaved);
    };

    const updateRating = (newValue: number | null) => {
        setRating(newValue);
        insertNewRating(newValue);
        notify(`You have given a rating of ${newValue} to the recipe ${recipe.recipe_title}`);
    };

    return (
        <PageWrapper>
            <RecipePageLeftSection
                loading={recommendedRecipesLoading}
                recommentedRecipes={recommendedRecipes[0]}
                shownRecipe={recipe}
            ></RecipePageLeftSection>
            <RecipePageRightSection
                bookmarkClicked={handleBookmarkClicked}
                isSaved={isSaved}
                isUploaded={!!isRecipeSaved?.userRecipesByUserAndRecipe.is_uploaded}
                rating={rating}
                shownRecipe={recipe}
                updateRating={updateRating}
            ></RecipePageRightSection>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    display: flex;
    width: 95vw;
    margin: 3em auto 2em 2em;
`;
