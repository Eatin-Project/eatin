import { useCallback, useEffect, useState } from "react";
import { useGetRecipesBySearchQuery } from "../../generated/graphql";
import { Recipe } from "../types";
import { useSearch } from "../../context/search-context";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useGetRecipesBySearch() {
    const { searchValue } = useSearch();
    const userID = useGetUsersName();
    const {
        data: searchResultRecipes,
        loading: searchResultRecipesLoading,
        refetch,
    } = useGetRecipesBySearchQuery({
        variables: { value: searchValue, userID: userID },
    });

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
