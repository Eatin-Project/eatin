import { useCallback, useEffect, useState } from "react";
import { useGetSavedRecipesBySearchQuery } from "../../generated/graphql";
import { Recipe } from "../types";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useGetSavedRecipesBySearch(searchValue: string) {
    const userID = useGetUsersName();
    const {
        data: searchResultRecipes,
        loading,
        refetch,
    } = useGetSavedRecipesBySearchQuery({
        variables: { value: searchValue, userID: userID },
    });

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getSavedRecipesBySearchQuery = useCallback(() => {
        setRecipes(searchResultRecipes ? searchResultRecipes.savedRecipesByValue : []);
    }, [searchResultRecipes]);

    useEffect(() => {
        refetch({ value: searchValue });
    }, [refetch, searchValue]);

    useEffect(() => {
        getSavedRecipesBySearchQuery();
    }, [getSavedRecipesBySearchQuery]);
    return { recipes, loading };
}
