import "./HomePage.css";

import {FC, useState} from "react";
import {RecommendedFeed} from "./RecommendedFeed";
import {useGetSections} from "../../graphql/queries/sections.query";
import {useSectionsFilterRecipes} from "../../components/hooks/useSectionsFilterRecipes";
import {RecipesCatalog} from "../../components/ui/RecipesCatalog";
import {useCatalogFilterRecipes} from "../../components/hooks/useCatalogFilterRecipes";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import {useGetRecipesBySearch} from "../../components/functions/useGetRecipesBySearch";
import {useGetUsersName} from "../../components/hooks/useGetUsersName";
import {FilterRecipes} from "./FilterRecipes";

export const HomePage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const userID = useGetUsersName();
    const {data: recommendedRecipes, loading: recommendedRecipesLoading} = useGetSections(userID);
    const {recipes: searchResultRecipes, searchResultRecipesLoading: searchResultRecipesLoading} =
        useGetRecipesBySearch(searchValue);
    const {filteredRecipes} = useSectionsFilterRecipes(recommendedRecipes);
    const {catalogFilteredRecipes, currentCatalogFilterOptions} = useCatalogFilterRecipes(searchResultRecipes);

    const getFilterSearchValue = (searchValue: string) => {
        setSearchValue(searchValue);
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-center w-100">
                <FilterRecipes filterOptions={currentCatalogFilterOptions} isSearch={!!searchValue && !!catalogFilteredRecipes}
                               isHidden={searchResultRecipesLoading || recommendedRecipesLoading} getFilterSearchValue={getFilterSearchValue}/>
            </div>
            {!!searchValue && !!catalogFilteredRecipes ?
                <AsyncDataLoaderWrapper loading={searchResultRecipesLoading}
                                        text="Searching the perfect recipes for you...">
                    <RecipesCatalog recipes={catalogFilteredRecipes}/>
                </AsyncDataLoaderWrapper> :
                <AsyncDataLoaderWrapper loading={recommendedRecipesLoading}
                                        text="Finding the perfect recipes for you...">
                    <RecommendedFeed currentRecipes={filteredRecipes} isLoadingCurrentRecipes={recommendedRecipesLoading}/>
                </AsyncDataLoaderWrapper>
            }
        </>
    );
};
