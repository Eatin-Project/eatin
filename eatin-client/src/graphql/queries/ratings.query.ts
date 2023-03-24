import {gql} from '@apollo/client';

export const GET_ALL_RATINGS = gql`
    query getAllRatings {
        ratings {
            user_id
            recipe_index
            rating
        }
    }
`;

export const GET_RATINGS_BY_USER_ID = gql`
    query getRatingsByUserId($id: String!) {
        ratingsByUser(id: $id) {
            user_id
            recipe_index
            rating
        }
    }
`;

export const GET_RATINGS_BY_RECIPE_INDEX = gql`
    query getRatingsByRecipeIndex($index: Float!) {
        ratingsByRecipe(index: $index) {
            user_id
            recipe_index
            rating
        }
    }
`;

export const GET_RATINGS_BY_RECIPE_AND_USER = gql`
    query getRatingsByRecipeAndUser($id: String!, $index: Float!) {
        ratingsByUserAndRecipe(id: $id, index: $index) {
            user_id
            recipe_index
            rating
        }
    }
`;