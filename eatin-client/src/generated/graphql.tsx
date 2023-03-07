import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Users;
};


export type MutationCreateUserArgs = {
  birthdate: Scalars['DateTime'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  lastname: Scalars['String'];
  phone: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: Users;
  users: Array<Users>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  birthdate: Scalars['DateTime'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  lastname: Scalars['String'];
  phone: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  id: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  gender: Scalars['String'];
  birthdate: Scalars['DateTime'];
  country: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string } };


export const CreateUserDocument = gql`
    mutation createUser($id: String!, $firstname: String!, $lastname: String!, $email: String!, $phone: String!, $gender: String!, $birthdate: DateTime!, $country: String!) {
  createUser(
    id: $id
    firstname: $firstname
    lastname: $lastname
    email: $email
    phone: $phone
    gender: $gender
    birthdate: $birthdate
    country: $country
  ) {
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      gender: // value for 'gender'
 *      birthdate: // value for 'birthdate'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetAllUsersDocument = gql`
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

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserByIdDocument = gql`
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

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;