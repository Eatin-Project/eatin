import { gql } from "@apollo/client";

export const GET_ALL_USERRECIPES = gql`
    query getAllUserRecipes {
        userRecipes {
            user_id
            recipe_index
            is_saved
        }
    }
`;

export const GET_USERRECIPES_BY_USER_ID = gql`
    query getUserRecipesByUserId($userID: String!) {
        userRecipesByUser(userID: $userID) {
            user_id
            recipe_index
            is_saved
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_INDEX = gql`
    query getUserRecipesByRecipeIndex($recipeID: Float!) {
        userRecipesByRecipe(recipeID: $recipeID) {
            user_id
            recipe_index
            is_saved
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_AND_IS_SAVED = gql`
    query getUserRecipesByRecipeIndexAndIsSaved($recipeID: Float!, $isSaved: Boolean!) {
        userRecipesByRecipeAndIsSaved(recipeID: $recipeID, isSaved: $isSaved) {
            user_id
            recipe_index
            is_saved
        }
    }
`;

export const GET_USERRECIPES_BY_USER_AND_IS_SAVED = gql`
    query getUserRecipesByUserAndIsSaved($userID: String!, isSaved: $isSaved) {
        userRecipesByUserAndIsSaved($userID: String!, isSaved: $isSaved) {
            user_id
            recipe_index
            is_saved
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_AND_USER = gql`
    query getUserRecipesByRecipeAndUser($userID: String!, $recipeID: Float!) {
        userRecipesByUserAndRecipe(userID: $userID, recipeID: $recipeID) {
            user_id
            recipe_index
            is_saved
        }
    }
`;
