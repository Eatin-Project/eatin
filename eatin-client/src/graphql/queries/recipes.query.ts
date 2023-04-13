import {gql} from '@apollo/client';

export const GET_ALL_RECIPES = gql`
    query getAllRecipes {
        recipes {
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
        }
    }
`;

export const GET_RECIPE_BY_ID = gql`
    query getRecipeById($index: Float!) {
        recipe(index: $index) {
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
        }
    }
`;

export const GET_RECIPE_BY_CATEGORY = gql`
    query getTopRatedRecipesByCategory($category: String!) {
        topRecipesByCategory(category: $category) {
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
        }
    }
`;

export const GET_RECIPE_BY_CUISINE = gql`
    query getTopRatedRecipesByCuisine($cuisine: String!) {
        topRecipesByCuisine(cuisine: $cuisine) {
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
        }
    }
`;