import "./HomePage.css";

import { FC, useEffect } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { useGetSections } from "../../graphql/queries/sections.query";
import { useAuth } from "../../context/auth-context";
import { RecipesCatalog } from "../../components/ui/RecipesCatalog";
import { useSearch } from "../../context/search-context";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useAddIsSavedToRecipesList } from "../../components/functions/useAddIsSavedToRecipesList";
import { useGetRecipesBySearch } from "../../components/functions/useGetRecipesBySearch";

export const HomePage: FC = () => {
    const { currentUser } = useAuth();
    const { searchValue } = useSearch();
    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSections(
        currentUser ? currentUser.uid : "",
    );
    const { recipes: searchResultRecipes, isLoading: searchResultRecipesLoading } =
        useGetRecipesBySearch();

    const {
        recipesWithIsSaved: resultRecipes,
        isLoading: resultRecipesLoading,
        updateIsSaved: updateResultRecipes,
    } = useAddIsSavedToRecipesList(searchResultRecipes);

    useEffect(() => {
        console.log(recommendedRecipes);
    }, [recommendedRecipes]);

    return (
        <div>
            {!!searchValue ? (
                <AsyncDataLoaderWrapper
                    loading={searchResultRecipesLoading || resultRecipesLoading}
                    text="Finding the perfect recipes for you..."
                >
                    <RecipesCatalog
                        recipes={resultRecipes}
                        specificSavedUpdateFunc={updateResultRecipes}
                    />
                </AsyncDataLoaderWrapper>
            ) : (
                <AsyncDataLoaderWrapper
                    loading={recommendedRecipesLoading}
                    text="Finding the perfect recipes for you..."
                >
                    <RecommendedFeed
                        currentRecipes={recommendedRecipes}
                        isLoadingCurrentRecipes={recommendedRecipesLoading}
                    />
                </AsyncDataLoaderWrapper>
            )}
        </div>
    );
};
