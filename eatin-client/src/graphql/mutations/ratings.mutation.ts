import {gql} from '@apollo/client';

export const CREATE_RATING = gql`
    mutation createRating($user_id: String!,
        $recipe_index: Float!,
        $rating: Float!) {
        createRating(user_id: $user_id, recipe_index: $recipe_index, rating: $rating) {
            user_id
            recipe_index
            rating
        }
    }
`;

