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
  createRecipe: Recipes;
  createUser: Users;
};


export type MutationCreateRecipeArgs = {
  author: Scalars['String'];
  category: Scalars['String'];
  cook_time: Scalars['String'];
  cuisine: Scalars['String'];
  description: Scalars['String'];
  diet: Scalars['String'];
  difficulty: Scalars['String'];
  image: Scalars['String'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  prep_time: Scalars['String'];
  recipe_title: Scalars['String'];
  record_health: Scalars['String'];
  tags: Scalars['String'];
  url: Scalars['String'];
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
  recipe: Recipes;
  recipes: Array<Recipes>;
  topRecipesByCategory: Array<Recipes>;
  topRecipesByCuisine: Array<Recipes>;
  user: Users;
  users: Array<Users>;
};


export type QueryRecipeArgs = {
  index: Scalars['String'];
};


export type QueryTopRecipesByCategoryArgs = {
  category: Scalars['String'];
};


export type QueryTopRecipesByCuisineArgs = {
  cuisine: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Recipes = {
  __typename?: 'Recipes';
  author: Scalars['String'];
  category: Scalars['String'];
  cook_time: Scalars['String'];
  cuisine: Scalars['String'];
  description: Scalars['String'];
  diet: Scalars['String'];
  difficulty: Scalars['String'];
  image: Scalars['String'];
  index: Scalars['String'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  prep_time: Scalars['String'];
  rating: Scalars['String'];
  recipe_title: Scalars['String'];
  record_health: Scalars['String'];
  tags: Scalars['String'];
  url: Scalars['String'];
  vote_count: Scalars['String'];
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

export type CreateRecipeMutationVariables = Exact<{
  recipe_title: Scalars['String'];
  url: Scalars['String'];
  record_health: Scalars['String'];
  description: Scalars['String'];
  cuisine: Scalars['String'];
  diet: Scalars['String'];
  prep_time: Scalars['String'];
  cook_time: Scalars['String'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  author: Scalars['String'];
  tags: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['String'];
  difficulty: Scalars['String'];
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipes', recipe_title: string, url: string, record_health: string, description: string, cuisine: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string } };

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

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipes', index: string, recipe_title: string, url: string, record_health: string, vote_count: string, rating: string, description: string, cuisine: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string }> };

export type GetRecipeByIdQueryVariables = Exact<{
  index: Scalars['String'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipes', index: string, recipe_title: string, url: string, record_health: string, vote_count: string, rating: string, description: string, cuisine: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string } };

export type GetTopRatedRecipesByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetTopRatedRecipesByCategoryQuery = { __typename?: 'Query', topRecipesByCategory: Array<{ __typename?: 'Recipes', index: string, recipe_title: string, url: string, record_health: string, vote_count: string, rating: string, description: string, cuisine: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string }> };

export type GetTopRatedRecipesByCuisineQueryVariables = Exact<{
  cuisine: Scalars['String'];
}>;


export type GetTopRatedRecipesByCuisineQuery = { __typename?: 'Query', topRecipesByCuisine: Array<{ __typename?: 'Recipes', index: string, recipe_title: string, url: string, record_health: string, vote_count: string, rating: string, description: string, cuisine: string, diet: string, prep_time: string, cook_time: string, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string } };


export const CreateRecipeDocument = gql`
    mutation createRecipe($recipe_title: String!, $url: String!, $record_health: String!, $description: String!, $cuisine: String!, $diet: String!, $prep_time: String!, $cook_time: String!, $ingredients: String!, $instructions: String!, $author: String!, $tags: String!, $category: String!, $image: String!, $difficulty: String!) {
  createRecipe(
    recipe_title: $recipe_title
    url: $url
    record_health: $record_health
    description: $description
    cuisine: $cuisine
    diet: $diet
    prep_time: $prep_time
    cook_time: $cook_time
    ingredients: $ingredients
    instructions: $instructions
    author: $author
    tags: $tags
    category: $category
    image: $image
    difficulty: $difficulty
  ) {
    recipe_title
    url
    record_health
    description
    cuisine
    diet
    prep_time
    cook_time
    ingredients
    instructions
    author
    tags
    category
    image
    difficulty
  }
}
    `;
export type CreateRecipeMutationFn = Apollo.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      recipe_title: // value for 'recipe_title'
 *      url: // value for 'url'
 *      record_health: // value for 'record_health'
 *      description: // value for 'description'
 *      cuisine: // value for 'cuisine'
 *      diet: // value for 'diet'
 *      prep_time: // value for 'prep_time'
 *      cook_time: // value for 'cook_time'
 *      ingredients: // value for 'ingredients'
 *      instructions: // value for 'instructions'
 *      author: // value for 'author'
 *      tags: // value for 'tags'
 *      category: // value for 'category'
 *      image: // value for 'image'
 *      difficulty: // value for 'difficulty'
 *   },
 * });
 */
export function useCreateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, options);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = Apollo.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = Apollo.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
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
export const GetAllRecipesDocument = gql`
    query getAllRecipes {
  recipes {
    index
    recipe_title
    url
    record_health
    vote_count
    rating
    description
    cuisine
    diet
    prep_time
    cook_time
    ingredients
    instructions
    author
    tags
    category
    image
    difficulty
  }
}
    `;

/**
 * __useGetAllRecipesQuery__
 *
 * To run a query within a React component, call `useGetAllRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRecipesQuery, GetAllRecipesQueryVariables>(GetAllRecipesDocument, options);
      }
export function useGetAllRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRecipesQuery, GetAllRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRecipesQuery, GetAllRecipesQueryVariables>(GetAllRecipesDocument, options);
        }
export type GetAllRecipesQueryHookResult = ReturnType<typeof useGetAllRecipesQuery>;
export type GetAllRecipesLazyQueryHookResult = ReturnType<typeof useGetAllRecipesLazyQuery>;
export type GetAllRecipesQueryResult = Apollo.QueryResult<GetAllRecipesQuery, GetAllRecipesQueryVariables>;
export const GetRecipeByIdDocument = gql`
    query getRecipeById($index: String!) {
  recipe(index: $index) {
    index
    recipe_title
    url
    record_health
    vote_count
    rating
    description
    cuisine
    diet
    prep_time
    cook_time
    ingredients
    instructions
    author
    tags
    category
    image
    difficulty
  }
}
    `;

/**
 * __useGetRecipeByIdQuery__
 *
 * To run a query within a React component, call `useGetRecipeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeByIdQuery({
 *   variables: {
 *      index: // value for 'index'
 *   },
 * });
 */
export function useGetRecipeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, options);
      }
export function useGetRecipeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, options);
        }
export type GetRecipeByIdQueryHookResult = ReturnType<typeof useGetRecipeByIdQuery>;
export type GetRecipeByIdLazyQueryHookResult = ReturnType<typeof useGetRecipeByIdLazyQuery>;
export type GetRecipeByIdQueryResult = Apollo.QueryResult<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>;
export const GetTopRatedRecipesByCategoryDocument = gql`
    query getTopRatedRecipesByCategory($category: String!) {
  topRecipesByCategory(category: $category) {
    index
    recipe_title
    url
    record_health
    vote_count
    rating
    description
    cuisine
    diet
    prep_time
    cook_time
    ingredients
    instructions
    author
    tags
    category
    image
    difficulty
  }
}
    `;

/**
 * __useGetTopRatedRecipesByCategoryQuery__
 *
 * To run a query within a React component, call `useGetTopRatedRecipesByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopRatedRecipesByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopRatedRecipesByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetTopRatedRecipesByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetTopRatedRecipesByCategoryQuery, GetTopRatedRecipesByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopRatedRecipesByCategoryQuery, GetTopRatedRecipesByCategoryQueryVariables>(GetTopRatedRecipesByCategoryDocument, options);
      }
export function useGetTopRatedRecipesByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopRatedRecipesByCategoryQuery, GetTopRatedRecipesByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopRatedRecipesByCategoryQuery, GetTopRatedRecipesByCategoryQueryVariables>(GetTopRatedRecipesByCategoryDocument, options);
        }
export type GetTopRatedRecipesByCategoryQueryHookResult = ReturnType<typeof useGetTopRatedRecipesByCategoryQuery>;
export type GetTopRatedRecipesByCategoryLazyQueryHookResult = ReturnType<typeof useGetTopRatedRecipesByCategoryLazyQuery>;
export type GetTopRatedRecipesByCategoryQueryResult = Apollo.QueryResult<GetTopRatedRecipesByCategoryQuery, GetTopRatedRecipesByCategoryQueryVariables>;
export const GetTopRatedRecipesByCuisineDocument = gql`
    query getTopRatedRecipesByCuisine($cuisine: String!) {
  topRecipesByCuisine(cuisine: $cuisine) {
    index
    recipe_title
    url
    record_health
    vote_count
    rating
    description
    cuisine
    diet
    prep_time
    cook_time
    ingredients
    instructions
    author
    tags
    category
    image
    difficulty
  }
}
    `;

/**
 * __useGetTopRatedRecipesByCuisineQuery__
 *
 * To run a query within a React component, call `useGetTopRatedRecipesByCuisineQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopRatedRecipesByCuisineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopRatedRecipesByCuisineQuery({
 *   variables: {
 *      cuisine: // value for 'cuisine'
 *   },
 * });
 */
export function useGetTopRatedRecipesByCuisineQuery(baseOptions: Apollo.QueryHookOptions<GetTopRatedRecipesByCuisineQuery, GetTopRatedRecipesByCuisineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopRatedRecipesByCuisineQuery, GetTopRatedRecipesByCuisineQueryVariables>(GetTopRatedRecipesByCuisineDocument, options);
      }
export function useGetTopRatedRecipesByCuisineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopRatedRecipesByCuisineQuery, GetTopRatedRecipesByCuisineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopRatedRecipesByCuisineQuery, GetTopRatedRecipesByCuisineQueryVariables>(GetTopRatedRecipesByCuisineDocument, options);
        }
export type GetTopRatedRecipesByCuisineQueryHookResult = ReturnType<typeof useGetTopRatedRecipesByCuisineQuery>;
export type GetTopRatedRecipesByCuisineLazyQueryHookResult = ReturnType<typeof useGetTopRatedRecipesByCuisineLazyQuery>;
export type GetTopRatedRecipesByCuisineQueryResult = Apollo.QueryResult<GetTopRatedRecipesByCuisineQuery, GetTopRatedRecipesByCuisineQueryVariables>;
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