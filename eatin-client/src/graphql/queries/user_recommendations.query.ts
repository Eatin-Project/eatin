import { gql } from "@apollo/client";

export const GET_USER_RECOMMENDATIONS = gql`
    query userRecommendations($userID: String!) {
        userRecommendations(userID: $userID) {
            user_id
            recommendations
        }
    }
`;
