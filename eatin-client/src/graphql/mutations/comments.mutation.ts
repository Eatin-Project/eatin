import { gql } from "@apollo/client";

export const CREATE_COMMENTS = gql`
    mutation createComments(
        $id: String!
        $user_id: String!
        $recipe_index: Float!
        $given_comment: String!
    ) {
        createComment(
            id: $id
            user_id: $user_id
            recipe_index: $recipe_index
            given_comment: $given_comment
        ) {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
        }
    }
`;

export const DELETE_COMMENTS = gql`
    mutation removeComments($id: String!) {
        removeComment(id: $id) {
            id
            user_id
            recipe_index
            given_comment
            comment_timestap
        }
    }
`;
