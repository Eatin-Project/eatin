import { useCallback, useEffect, useState } from "react";
import { useGetRecipesBySearchQuery } from "../../generated/graphql";
import { Recipe } from "../types";
import { useSearch } from "../../context/search-context";

export function useGetRecipesBySearch() {
    const { searchValue } = useSearch();
    const {
        data: searchResultRecipes,
        loading: searchResultRecipesLoading,
        refetch,
    } = useGetRecipesBySearchQuery({ variables: { value: searchValue } });

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRecipesBySearchQuery = useCallback(() => {
        setIsLoading(true);
        setRecipes(searchResultRecipes ? searchResultRecipes.recipesByValue : []);
        setIsLoading(false);
    }, [searchResultRecipes]);

    useEffect(() => {
        refetch({ value: searchValue });
    }, [refetch, searchValue]);

    useEffect(() => {
        getRecipesBySearchQuery();
    }, [getRecipesBySearchQuery]);
    return { recipes, isLoading };
}
