import "./HomePage.css";

import { FC } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { useGetSections } from "../../graphql/queries/sections.query";
import { RecipesCatalog } from "../../components/ui/RecipesCatalog";
import { useSearch } from "../../context/search-context";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useGetRecipesBySearch } from "../../components/functions/useGetRecipesBySearch";
import { useGetUsersName } from "../../components/hooks/useGetUsersName";

export const HomePage: FC = () => {
    const { searchValue } = useSearch();
    const userID = useGetUsersName();

    const { data: recommendedRecipes, loading: recommendedRecipesLoading } = useGetSections(userID);
    const { recipes: searchResultRecipes, isLoading: searchResultRecipesLoading } =
        useGetRecipesBySearch();

    return (
        <div>
            {!!searchValue ? (
                <AsyncDataLoaderWrapper
                    loading={searchResultRecipesLoading}
                    text="Finding the perfect recipes for you..."
                >
                    <RecipesCatalog recipes={searchResultRecipes} />
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
