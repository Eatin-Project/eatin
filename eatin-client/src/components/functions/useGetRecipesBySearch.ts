import { useCallback, useEffect, useState } from "react";
import { useGetRecipesBySearchQuery } from "../../generated/graphql";
import { Recipe } from "../types";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useGetRecipesBySearch(searchValue: string) {
    const userID = useGetUsersName();
    const {
        data: searchResultRecipes,
        loading: searchResultRecipesLoading,
        refetch,
    } = useGetRecipesBySearchQuery({
        variables: { value: searchValue, userID: userID },
    });

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getRecipesBySearchQuery = useCallback(() => {
        setRecipes(searchResultRecipes ? searchResultRecipes.recipesByValue : []);
    }, [searchResultRecipes]);

    useEffect(() => {
        refetch({ value: searchValue });
    }, [refetch, searchValue]);

    useEffect(() => {
        getRecipesBySearchQuery();
    }, [getRecipesBySearchQuery]);
    return { recipes, searchResultRecipesLoading };
}
