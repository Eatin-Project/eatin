import "./HomePage.css";

import { FC } from "react";
import { RecommendedFeed } from "./RecommendedFeed";
import { useGetSections } from "../../graphql/queries/sections.query";
import { RecipesCatalog } from "../../components/ui/RecipesCatalog";
import { useSearch } from "../../context/search-context";
import {FC, useEffect, useState} from "react";
import {RecommendedFeed} from "./RecommendedFeed";
import {Recipe, RecipesSection} from "../../components/types";
import {useGetSections} from "../../graphql/queries/sections.query";
import {useAuth} from "../../context/auth-context";
import {useGetRecipesBySearchQuery} from "../../generated/graphql";
import {useSectionsFilterRecipes} from "../../components/hooks/useSectionsFilterRecipes";
import {RecipesCatalog} from "../../components/ui/RecipesCatalog";
import {useCatalogFilterRecipes} from "../../components/hooks/useCatalogFilterRecipes";
import { useAddIsSavedToRecipesSection } from "../../components/functions/useAddIsSavedToRecipesSection";
import {useSearch} from "../../context/search-context";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useGetRecipesBySearch } from "../../components/functions/useGetRecipesBySearch";
import { useGetUsersName } from "../../components/hooks/useGetUsersName";
import {FilterRecipes} from "./FilterRecipes";

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
        <>
            <FilterRecipes key={currentCatalogFilterOptions.length} filterOptions={currentCatalogFilterOptions} isSearch={!!searchValue && !!resultRecipes}/>
            { !!searchValue && !!resultRecipes ?
                <AsyncDataLoaderWrapper loading={searchResultRecipesLoading} text="Searching the perfect recipes for you...">
                    <RecipesCatalog recipes={catalogFilteredRecipes}/>
                </AsyncDataLoaderWrapper> :
                <AsyncDataLoaderWrapper loading={recommendedRecipesLoading}
                                        text="Finding the perfect recipes for you...">
                    <RecommendedFeed currentRecipes={filteredRecipes} isLoadingCurrentRecipes={updateSavedStateLoading} updateSavedStateInRecipesSection={updateIsSaved}/>
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
