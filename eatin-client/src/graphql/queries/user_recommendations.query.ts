import { gql } from "@apollo/client";

export const GET_USER_RECOMMENDATIONS = gql`
    query getUserRecommendations($userID: String!) {
        userRecommendationsByUser(userID: $userID) {
            user_id
            recommendations
        }
    }
`;
