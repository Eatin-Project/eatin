import { gql } from "@apollo/client";

export const CREATE_USERRECIPES = gql`
    mutation createUserRecipes($user_id: String!, $recipe_index: Float!, $is_saved: Boolean!) {
        createUserRecipes(user_id: $user_id, recipe_index: $recipe_index, is_saved: $is_saved) {
            user_id
            recipe_index
            is_saved
        }
    }
`;

export const DELETE_USERRECIPES = gql`
    mutation RemoveUserRecipes($user_id: String!, $recipe_index: Float!) {
        removeUserRecipes(userID: $user_id, recipeID: $recipe_index) {
            user_id
            recipe_index
            is_saved
        }
    }
`;
