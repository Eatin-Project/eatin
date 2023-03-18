import {gql} from '@apollo/client';

export const GET_ALL_RECIPES = gql`
    query getAllRatings {
        ratings {
            user_id
            recipe_index
            rating
        }
    }
`;

export const GET_RECIPE_BY_USER_ID = gql`
    query getRatingsByUserId($id: String!) {
        ratingsByUser(id: $id) {
            user_id
            recipe_index
            rating
        }
    }
`;

export const GET_RECIPE_BY_RECIPE_INDEX = gql`
    query getRatingsByRecipeIndex($index: Float!) {
        ratingsByRecipe(index: $index) {
            user_id
            recipe_index
            rating
        }
    }
`;