import "./HomePage.css";

import { FC, useEffect, useState } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { useSectionsFilterRecipes } from "../../components/hooks/useSectionsFilterRecipes";
import { RecipesCatalog } from "../../components/ui/RecipesCatalog";
import { useCatalogFilterRecipes } from "../../components/hooks/useCatalogFilterRecipes";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useGetUsersName } from "../../components/hooks/useGetUsersName";
import { FilterRecipes } from "./FilterRecipes";
import { useGetRecipesBySearch } from "../../components/functions/useGetRecipesBySearch";
import { useGetUserRecommendationsQuery } from "../../generated/graphql";
import { RecipesSection } from "../../components/types";

export const HomePage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const userID = useGetUsersName();
    const [recommendedRecipes, setRecommendedRecipes] = useState<RecipesSection[]>([]);
    const { data: userRecommendationsResult, loading: userRecommendationsResultLoading } =
        useGetUserRecommendationsQuery({
            variables: { userID: userID },
            fetchPolicy: "no-cache",
        });
    const { recipes: searchResultRecipes, searchResultRecipesLoading } =
        useGetRecipesBySearch(searchValue);
    const { filteredRecipes } = useSectionsFilterRecipes(recommendedRecipes);
    const { catalogFilteredRecipes, currentCatalogFilterOptions } =
        useCatalogFilterRecipes(searchResultRecipes);

    useEffect(() => {
        userRecommendationsResult &&
            setRecommendedRecipes(
                JSON.parse(userRecommendationsResult.userRecommendationsByUser.recommendations),
            );
    }, [userRecommendationsResult, userRecommendationsResultLoading]);

    const getFilterSearchValue = (searchValue: string) => {
        setSearchValue(searchValue);
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center w-100">
                <FilterRecipes
                    filterOptions={currentCatalogFilterOptions}
                    isSearch={!!searchValue && !!catalogFilteredRecipes}
                    isHidden={searchResultRecipesLoading || userRecommendationsResultLoading}
                    getFilterSearchValue={getFilterSearchValue}
                />
            </div>
            {!!searchValue && !!catalogFilteredRecipes ? (
                <AsyncDataLoaderWrapper
                    loading={searchResultRecipesLoading}
                    text="Searching the perfect recipes for you..."
                >
                    <RecipesCatalog recipes={catalogFilteredRecipes} />
                </AsyncDataLoaderWrapper>
            ) : (
                <AsyncDataLoaderWrapper
                    loading={userRecommendationsResultLoading}
                    text="Finding the perfect recipes for you..."
                >
                    <RecommendedFeed
                        currentRecipes={filteredRecipes}
                        isLoadingCurrentRecipes={userRecommendationsResultLoading}
                    />
                </AsyncDataLoaderWrapper>
            )}
        </>
    );
};
