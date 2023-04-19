import "./HomePage.css";

import { FC } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { useGetSections } from "../../graphql/queries/sections.query";
import { useAuth } from "../../context/auth-context";
import { RecipesCatalog } from "../../components/ui/RecipesCatalog";
import { useAddIsSavedToRecipesSection } from "../../components/functions/useAddIsSavedToRecipesSection";
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
        recipesWithIsSaved: recipesData,
        isLoading: updateSavedStateLoading,
        updateIsSaved: updateRecipeData,
    } = useAddIsSavedToRecipesSection(recommendedRecipes);

    const {
        recipesWithIsSaved: resultRecipes,
        isLoading: resultRecipesLoading,
        updateIsSaved: updateResultRecipes,
    } = useAddIsSavedToRecipesList(searchResultRecipes);

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
                    loading={recommendedRecipesLoading || updateSavedStateLoading}
                    text="Finding the perfect recipes for you..."
                >
                    <RecommendedFeed
                        currentRecipes={recipesData}
                        isLoadingCurrentRecipes={updateSavedStateLoading}
                        updateSavedStateInRecipesSection={updateRecipeData}
                    />
                </AsyncDataLoaderWrapper>
            )}
        </div>
    );
};
