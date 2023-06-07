import { useCallback, useEffect, useState } from "react";
import { useGetUploadedRecipesBySearchQuery } from "../../generated/graphql";
import { Recipe } from "../types";
import { useGetUsersName } from "../hooks/useGetUsersName";

export function useGetUploadedRecipesBySearch(searchValue: string) {
    const userID = useGetUsersName();
    const {
        data: searchResultRecipes,
        loading,
        refetch,
    } = useGetUploadedRecipesBySearchQuery({
        variables: { value: searchValue, userID: userID },
    });

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getUploadedRecipesBySearchQuery = useCallback(() => {
        setRecipes(searchResultRecipes ? searchResultRecipes.uploadedRecipesByValue : []);
    }, [searchResultRecipes]);

    useEffect(() => {
        refetch({ value: searchValue });
    }, [refetch, searchValue]);

    useEffect(() => {
        getUploadedRecipesBySearchQuery();
    }, [getUploadedRecipesBySearchQuery]);
    return { recipes, loading };
}
