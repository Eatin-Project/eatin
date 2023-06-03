import { gql } from "@apollo/client";

export const GET_ALL_RECIPES = gql`
    query getAllRecipes($userID: String!) {
        recipes(userID: $userID) {
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

export const GET_RECIPE_BY_ID = gql`
    query getRecipeById($index: Float!, $userID: String!) {
        recipe(index: $index, userID: $userID) {
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

export const GET_RECIPES_BY_VALUE = gql`
    query getRecipesBySearch($value: String!, $userID: String!) {
        recipesByValue(value: $value, userID: $userID) {
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

export const GET_SAVED_RECIPES_BY_VALUE = gql`
    query getSavedRecipesBySearch($value: String!, $userID: String!) {
        savedRecipesByValue(value: $value, userID: $userID) {
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

export const GET_UPLOADED_RECIPES_BY_VALUE = gql`
    query getUploadedRecipesBySearch($value: String!, $userID: String!) {
        uploadedRecipesByValue(value: $value, userID: $userID) {
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

export const GET_RECIPE_BY_CATEGORY = gql`
    query getTopRatedRecipesByCategory($category: String!, $userID: String!) {
        topRecipesByCategory(category: $category, userID: $userID) {
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

export const GET_RECIPE_BY_CUISINE = gql`
    query getTopRatedRecipesByCuisine($cuisine: String!, $userID: String!) {
        topRecipesByCuisine(cuisine: $cuisine, userID: $userID) {
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
