import { gql } from "@apollo/client";

export const GET_ALL_USERRECIPES = gql`
    query getAllUserrecipes {
        userRecipes {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_USER_ID = gql`
    query getUserrecipesByUserId($userID: String!) {
        userRecipesByUser(userID: $userID) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_INDEX = gql`
    query getUserrecipesByRecipeIndex($recipeID: Float!) {
        userRecipesByRecipe(recipeID: $recipeID) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_AND_IS_SAVED = gql`
    query getUserrecipesByRecipeIndexAndIsSaved($recipeID: Float!, $isSaved: Boolean!) {
        userRecipesByRecipeAndIsSaved(recipeID: $recipeID, isSaved: $isSaved) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_USER_AND_IS_SAVED = gql`
    query getUserrecipesByUserAndIsSaved($userID: String!, $isSaved: Boolean!) {
        userRecipesByUserAndIsSaved(userID: $userID, isSaved: $isSaved) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_AND_IS_UPLOADED = gql`
    query getUserrecipesByRecipeIndexAndIsUploaded($recipeID: Float!, $isUploaded: Boolean!) {
        userRecipesByRecipeAndIsUploaded(recipeID: $recipeID, isUploaded: $isUploaded) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_USER_AND_IS_UPLOADED = gql`
    query getUserrecipesByUserAndIsUploaded($userID: String!, $isUploaded: Boolean!) {
        userRecipesByUserAndIsUploaded(userID: $userID, isUploaded: $isUploaded) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_USERRECIPES_BY_RECIPE_AND_USER = gql`
    query getUserrecipesByRecipeAndUser($userID: String!, $recipeID: Float!) {
        userRecipesByUserAndRecipe(userID: $userID, recipeID: $recipeID) {
            user_id
            recipe_index
            is_saved
            is_uploaded
            given_comment
        }
    }
`;

export const GET_SAVED_RECIPES = gql`
    query getSavedRecipes($userID: String!) {
        savedRecipesOfUser(userID: $userID) {
            index
            recipe_title
            url
            record_health
            vote_count
            rating
            description
            cuisine
            course
            diet
            prep_time
            cook_time
            ingredients
            instructions
            author
            tags
            category
            image
            difficulty
            total_time
            is_saved
            is_uploaded
        }
    }
`;
