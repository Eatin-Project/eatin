import {gql} from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($id: String!,
        $firstname: String!,
        $lastname: String!,
        $email: String!,
        $phone: String!,
        $gender: String!,
        $birthdate: DateTime!,
        $country: String!) {
        createUser(id: $id, firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, gender: $gender, birthdate: $birthdate, country: $country) {
            id
            firstname
            lastname
            email
            phone
            gender
            birthdate
            country
        }
    }
`;

