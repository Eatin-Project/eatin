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
  createRating: Ratings;
  createRecipe: Recipes;
  createUser: Users;
};


export type MutationCreateRatingArgs = {
  rating: Scalars['Float'];
  recipe_index: Scalars['Float'];
  user_id: Scalars['String'];
};


export type MutationCreateRecipeArgs = {
  author: Scalars['String'];
  category: Scalars['String'];
  cook_time: Scalars['Float'];
  course: Scalars['String'];
  cuisine: Scalars['String'];
  description: Scalars['String'];
  diet: Scalars['String'];
  difficulty: Scalars['String'];
  image: Scalars['String'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  prep_time: Scalars['Float'];
  recipe_title: Scalars['String'];
  record_health: Scalars['String'];
  tags: Scalars['String'];
  total_time: Scalars['Float'];
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
  ratings: Array<Ratings>;
  ratingsByRecipe: Ratings;
  ratingsByUser: Ratings;
  ratingsByUserAndRecipe: Ratings;
  recipe: Recipes;
  recipes: Array<Recipes>;
  topRecipesByCategory: Array<Recipes>;
  topRecipesByCuisine: Array<Recipes>;
  user: Users;
  users: Array<Users>;
};


export type QueryRatingsByRecipeArgs = {
  index: Scalars['Float'];
};


export type QueryRatingsByUserArgs = {
  id: Scalars['String'];
};


export type QueryRatingsByUserAndRecipeArgs = {
  id: Scalars['String'];
  index: Scalars['Float'];
};


export type QueryRecipeArgs = {
  index: Scalars['Float'];
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

export type Ratings = {
  __typename?: 'Ratings';
  rating: Scalars['Float'];
  recipe_index: Scalars['Float'];
  user_id: Scalars['String'];
};

export type Recipes = {
  __typename?: 'Recipes';
  author: Scalars['String'];
  category: Scalars['String'];
  cook_time: Scalars['Float'];
  course: Scalars['String'];
  cuisine: Scalars['String'];
  description: Scalars['String'];
  diet: Scalars['String'];
  difficulty: Scalars['String'];
  image: Scalars['String'];
  index: Scalars['Float'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  prep_time: Scalars['Float'];
  rating: Scalars['Float'];
  recipe_title: Scalars['String'];
  record_health: Scalars['String'];
  tags: Scalars['String'];
  total_time: Scalars['Float'];
  url: Scalars['String'];
  vote_count: Scalars['Float'];
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

export type CreateRatingMutationVariables = Exact<{
  user_id: Scalars['String'];
  recipe_index: Scalars['Float'];
  rating: Scalars['Float'];
}>;


export type CreateRatingMutation = { __typename?: 'Mutation', createRating: { __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number } };

export type CreateRecipeMutationVariables = Exact<{
  recipe_title: Scalars['String'];
  url: Scalars['String'];
  record_health: Scalars['String'];
  description: Scalars['String'];
  cuisine: Scalars['String'];
  course: Scalars['String'];
  diet: Scalars['String'];
  prep_time: Scalars['Float'];
  cook_time: Scalars['Float'];
  ingredients: Scalars['String'];
  instructions: Scalars['String'];
  author: Scalars['String'];
  tags: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['String'];
  difficulty: Scalars['String'];
  total_time: Scalars['Float'];
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipes', recipe_title: string, url: string, record_health: string, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number } };

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

export type GetAllRatingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRatingsQuery = { __typename?: 'Query', ratings: Array<{ __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number }> };

export type GetRatingsByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRatingsByUserIdQuery = { __typename?: 'Query', ratingsByUser: { __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number } };

export type GetRatingsByRecipeIndexQueryVariables = Exact<{
  index: Scalars['Float'];
}>;


export type GetRatingsByRecipeIndexQuery = { __typename?: 'Query', ratingsByRecipe: { __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number } };

export type GetRatingsByRecipeAndUserQueryVariables = Exact<{
  id: Scalars['String'];
  index: Scalars['Float'];
}>;


export type GetRatingsByRecipeAndUserQuery = { __typename?: 'Query', ratingsByUserAndRecipe: { __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number } };

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetRecipeByIdQueryVariables = Exact<{
  index: Scalars['Float'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number } };

export type GetTopRatedRecipesByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetTopRatedRecipesByCategoryQuery = { __typename?: 'Query', topRecipesByCategory: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetTopRatedRecipesByCuisineQueryVariables = Exact<{
  cuisine: Scalars['String'];
}>;


export type GetTopRatedRecipesByCuisineQuery = { __typename?: 'Query', topRecipesByCuisine: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstname: string, lastname: string, email: string, phone: string, gender: string, birthdate: any, country: string } };


export const CreateRatingDocument = gql`
    mutation createRating($user_id: String!, $recipe_index: Float!, $rating: Float!) {
  createRating(user_id: $user_id, recipe_index: $recipe_index, rating: $rating) {
    user_id
    recipe_index
    rating
  }
}
    `;
export type CreateRatingMutationFn = Apollo.MutationFunction<CreateRatingMutation, CreateRatingMutationVariables>;

/**
 * __useCreateRatingMutation__
 *
 * To run a mutation, you first call `useCreateRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRatingMutation, { data, loading, error }] = useCreateRatingMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      recipe_index: // value for 'recipe_index'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useCreateRatingMutation(baseOptions?: Apollo.MutationHookOptions<CreateRatingMutation, CreateRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRatingMutation, CreateRatingMutationVariables>(CreateRatingDocument, options);
      }
export type CreateRatingMutationHookResult = ReturnType<typeof useCreateRatingMutation>;
export type CreateRatingMutationResult = Apollo.MutationResult<CreateRatingMutation>;
export type CreateRatingMutationOptions = Apollo.BaseMutationOptions<CreateRatingMutation, CreateRatingMutationVariables>;
export const CreateRecipeDocument = gql`
    mutation createRecipe($recipe_title: String!, $url: String!, $record_health: String!, $description: String!, $cuisine: String!, $course: String!, $diet: String!, $prep_time: Float!, $cook_time: Float!, $ingredients: String!, $instructions: String!, $author: String!, $tags: String!, $category: String!, $image: String!, $difficulty: String!, $total_time: Float!) {
  createRecipe(
    recipe_title: $recipe_title
    url: $url
    record_health: $record_health
    description: $description
    cuisine: $cuisine
    course: $course
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
    total_time: $total_time
  ) {
    recipe_title
    url
    record_health
    description
    cuisine
    course
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
    total_time
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
 *      course: // value for 'course'
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
 *      total_time: // value for 'total_time'
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
export const GetAllRatingsDocument = gql`
    query getAllRatings {
  ratings {
    user_id
    recipe_index
    rating
  }
}
    `;

/**
 * __useGetAllRatingsQuery__
 *
 * To run a query within a React component, call `useGetAllRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRatingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRatingsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRatingsQuery, GetAllRatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRatingsQuery, GetAllRatingsQueryVariables>(GetAllRatingsDocument, options);
      }
export function useGetAllRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRatingsQuery, GetAllRatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRatingsQuery, GetAllRatingsQueryVariables>(GetAllRatingsDocument, options);
        }
export type GetAllRatingsQueryHookResult = ReturnType<typeof useGetAllRatingsQuery>;
export type GetAllRatingsLazyQueryHookResult = ReturnType<typeof useGetAllRatingsLazyQuery>;
export type GetAllRatingsQueryResult = Apollo.QueryResult<GetAllRatingsQuery, GetAllRatingsQueryVariables>;
export const GetRatingsByUserIdDocument = gql`
    query getRatingsByUserId($id: String!) {
  ratingsByUser(id: $id) {
    user_id
    recipe_index
    rating
  }
}
    `;

/**
 * __useGetRatingsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetRatingsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRatingsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetRatingsByUserIdQuery, GetRatingsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingsByUserIdQuery, GetRatingsByUserIdQueryVariables>(GetRatingsByUserIdDocument, options);
      }
export function useGetRatingsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingsByUserIdQuery, GetRatingsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingsByUserIdQuery, GetRatingsByUserIdQueryVariables>(GetRatingsByUserIdDocument, options);
        }
export type GetRatingsByUserIdQueryHookResult = ReturnType<typeof useGetRatingsByUserIdQuery>;
export type GetRatingsByUserIdLazyQueryHookResult = ReturnType<typeof useGetRatingsByUserIdLazyQuery>;
export type GetRatingsByUserIdQueryResult = Apollo.QueryResult<GetRatingsByUserIdQuery, GetRatingsByUserIdQueryVariables>;
export const GetRatingsByRecipeIndexDocument = gql`
    query getRatingsByRecipeIndex($index: Float!) {
  ratingsByRecipe(index: $index) {
    user_id
    recipe_index
    rating
  }
}
    `;

/**
 * __useGetRatingsByRecipeIndexQuery__
 *
 * To run a query within a React component, call `useGetRatingsByRecipeIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsByRecipeIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsByRecipeIndexQuery({
 *   variables: {
 *      index: // value for 'index'
 *   },
 * });
 */
export function useGetRatingsByRecipeIndexQuery(baseOptions: Apollo.QueryHookOptions<GetRatingsByRecipeIndexQuery, GetRatingsByRecipeIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingsByRecipeIndexQuery, GetRatingsByRecipeIndexQueryVariables>(GetRatingsByRecipeIndexDocument, options);
      }
export function useGetRatingsByRecipeIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingsByRecipeIndexQuery, GetRatingsByRecipeIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingsByRecipeIndexQuery, GetRatingsByRecipeIndexQueryVariables>(GetRatingsByRecipeIndexDocument, options);
        }
export type GetRatingsByRecipeIndexQueryHookResult = ReturnType<typeof useGetRatingsByRecipeIndexQuery>;
export type GetRatingsByRecipeIndexLazyQueryHookResult = ReturnType<typeof useGetRatingsByRecipeIndexLazyQuery>;
export type GetRatingsByRecipeIndexQueryResult = Apollo.QueryResult<GetRatingsByRecipeIndexQuery, GetRatingsByRecipeIndexQueryVariables>;
export const GetRatingsByRecipeAndUserDocument = gql`
    query getRatingsByRecipeAndUser($id: String!, $index: Float!) {
  ratingsByUserAndRecipe(id: $id, index: $index) {
    user_id
    recipe_index
    rating
  }
}
    `;

/**
 * __useGetRatingsByRecipeAndUserQuery__
 *
 * To run a query within a React component, call `useGetRatingsByRecipeAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsByRecipeAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsByRecipeAndUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useGetRatingsByRecipeAndUserQuery(baseOptions: Apollo.QueryHookOptions<GetRatingsByRecipeAndUserQuery, GetRatingsByRecipeAndUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingsByRecipeAndUserQuery, GetRatingsByRecipeAndUserQueryVariables>(GetRatingsByRecipeAndUserDocument, options);
      }
export function useGetRatingsByRecipeAndUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingsByRecipeAndUserQuery, GetRatingsByRecipeAndUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingsByRecipeAndUserQuery, GetRatingsByRecipeAndUserQueryVariables>(GetRatingsByRecipeAndUserDocument, options);
        }
export type GetRatingsByRecipeAndUserQueryHookResult = ReturnType<typeof useGetRatingsByRecipeAndUserQuery>;
export type GetRatingsByRecipeAndUserLazyQueryHookResult = ReturnType<typeof useGetRatingsByRecipeAndUserLazyQuery>;
export type GetRatingsByRecipeAndUserQueryResult = Apollo.QueryResult<GetRatingsByRecipeAndUserQuery, GetRatingsByRecipeAndUserQueryVariables>;
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
    course
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
    total_time
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
    query getRecipeById($index: Float!) {
  recipe(index: $index) {
    index
    recipe_title
    url
    record_health
    vote_count
    rating
    description
    cuisine
    course
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
    total_time
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
    course
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
    total_time
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
    course
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
    total_time
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