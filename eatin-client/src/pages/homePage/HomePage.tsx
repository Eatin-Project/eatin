import "./HomePage.css";

import {FC, useEffect, useState} from "react";
import {RecommendedFeed} from "./RecommendedFeed";
import {Recipe, RecipesSection} from "../../components/types";
import {useGetSections} from "../../graphql/queries/sections.query";
import {useAuth} from "../../context/auth-context";
import {useGetRecipesBySearchQuery} from "../../generated/graphql";
import {useSectionsFilterRecipes} from "../../components/hooks/useSectionsFilterRecipes";
import {RecipesCatalog} from "../../components/ui/RecipesCatalog";
import {useCatalogFilterRecipes} from "../../components/hooks/useCatalogFilterRecipes";
import RecipesWithFiltersWrapper from "../../components/ui/RecipesWithFiltersWrapper";
import { useAddIsSavedToRecipesSection } from "../../components/functions/useAddIsSavedToRecipesSection";
import {useSearch} from "../../context/search-context";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";

const _ = require("lodash");

export const HomePage: FC = () => {
    const [allRecipes, setAllRecipes] = useState<RecipesSection[]>([]);
    const [resultRecipes, setResultRecipes] = useState<Recipe[]>([]);
    const {currentUser} = useAuth();
    const {searchValue} = useSearch();
    const {data: recommendedRecipes, loading: recommendedRecipesLoading} = useGetSections(
        currentUser ? currentUser.uid : "",
    );
    const {data: searchResultRecipes, loading: searchResultRecipesLoading} = useGetRecipesBySearchQuery(
        {variables: {value: searchValue}});
    const {filteredRecipes} = useSectionsFilterRecipes(allRecipes);
    const {currentCatalogFilterOptions, catalogFilteredRecipes} = useCatalogFilterRecipes(resultRecipes);

    useEffect(() => {
        setResultRecipes(!!searchResultRecipes?.recipesByValue ? searchResultRecipes.recipesByValue : []);
    }, [searchResultRecipes]);

    const {
        recipesWithIsSaved: recipesData,
        isLoading: updateSavedStateLoading,
        updateIsSaved,
    } = useAddIsSavedToRecipesSection(recommendedRecipes);

    useEffect(() => {
        const initialRecipes: { name: string; recipes: Recipe[] }[] = recipesData?.map(
            (section: { name: any; recipes: any }) => ({
                name: section.name,
                recipes: section.recipes,
            }),
        );
        setAllRecipes(initialRecipes);
    }, [currentUser, recipesData]);

    return (
        <>
            { !!searchValue && !!resultRecipes ?
                <RecipesWithFiltersWrapper filterOptions={currentCatalogFilterOptions} loading={searchResultRecipesLoading} >
                    <RecipesCatalog recipes={catalogFilteredRecipes}/>
                </RecipesWithFiltersWrapper> :
                <AsyncDataLoaderWrapper loading={recommendedRecipesLoading}
                                        text="Finding the perfect recipes for you...">
                    <RecommendedFeed currentRecipes={filteredRecipes} isLoadingCurrentRecipes={updateSavedStateLoading} updateSavedStateInRecipesSection={updateIsSaved}/>
                </AsyncDataLoaderWrapper>
            }
        </>
    );
};
