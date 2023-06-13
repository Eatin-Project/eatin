import { gql } from "@apollo/client";

export const GET_ALL_COMMENTS = gql`
    query getAllComments {
        comments {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
            user_first_name
            user_last_name
            user_image
        }
    }
`;

export const GET_COMMENTS_BY_USER_ID = gql`
    query getCommentsByUserID($userID: String!) {
        commentsByUserID(userID: $userID) {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
            user_first_name
            user_last_name
            user_image
        }
    }
`;

export const GET_COMMENTS_BY_ID = gql`
    query getCommentsByID($id: String!) {
        commentsByID(id: $id) {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
            user_first_name
            user_last_name
            user_image
        }
    }
`;

export const GET_COMMENTS_BY_RECIPE_INDEX = gql`
    query getCommentsByRecipeIndex($recipeID: Float!) {
        commentsByRecipeIndex(recipeID: $recipeID) {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
            user_first_name
            user_last_name
            user_image
        }
    }
`;

export const GET_COMMENTS_BY_RECIPE_AND_USER = gql`
    query getcommentsByRecipeAndUser($userID: String!, $recipeID: Float!) {
        commentsByRecipeAndUser(userID: $userID, recipeID: $recipeID) {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
            user_first_name
            user_last_name
            user_image
        }
    }
`;
