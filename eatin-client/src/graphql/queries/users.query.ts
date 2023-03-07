import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
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

export const GET_USER_BY_ID = gql`
  query getUserById($id: String!) {
    user(id: $id) {
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