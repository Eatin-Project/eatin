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
  createUserRecipes: Userrecipes;
  removeUserRecipes: Userrecipes;
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


export type MutationCreateUserRecipesArgs = {
  given_comment: Scalars['String'];
  is_saved: Scalars['Boolean'];
  is_uploaded: Scalars['Boolean'];
  recipe_index: Scalars['Float'];
  user_id: Scalars['String'];
};


export type MutationRemoveUserRecipesArgs = {
  recipeID: Scalars['Float'];
  userID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  ratingByUserAndRecipe: Ratings;
  ratings: Array<Ratings>;
  ratingsByRecipe: Array<Ratings>;
  ratingsByUser: Array<Ratings>;
  recipe: Recipes;
  recipes: Array<Recipes>;
  recipesByValue: Array<Recipes>;
  topRecipesByCategory: Array<Recipes>;
  topRecipesByCuisine: Array<Recipes>;
  user: Users;
  userRecipes: Array<Userrecipes>;
  userRecipesByRecipe: Array<Userrecipes>;
  userRecipesByRecipeAndIsCommentExists: Array<Userrecipes>;
  userRecipesByRecipeAndIsSaved: Array<Userrecipes>;
  userRecipesByRecipeAndIsUploaded: Array<Userrecipes>;
  userRecipesByUser: Array<Userrecipes>;
  userRecipesByUserAndIsCommentExists: Array<Userrecipes>;
  userRecipesByUserAndIsSaved: Array<Userrecipes>;
  userRecipesByUserAndIsUploaded: Array<Userrecipes>;
  userRecipesByUserAndRecipe: Userrecipes;
  userRecipesByUserWithRecipe: Array<Userrecipes>;
  users: Array<Users>;
};


export type QueryRatingByUserAndRecipeArgs = {
  id: Scalars['String'];
  index: Scalars['Float'];
};


export type QueryRatingsByRecipeArgs = {
  index: Scalars['Float'];
};


export type QueryRatingsByUserArgs = {
  id: Scalars['String'];
};


export type QueryRecipeArgs = {
  index: Scalars['Float'];
};


export type QueryRecipesByValueArgs = {
  value: Scalars['String'];
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


export type QueryUserRecipesByRecipeArgs = {
  recipeID: Scalars['Float'];
};


export type QueryUserRecipesByRecipeAndIsCommentExistsArgs = {
  recipeID: Scalars['Float'];
};


export type QueryUserRecipesByRecipeAndIsSavedArgs = {
  isSaved: Scalars['Boolean'];
  recipeID: Scalars['Float'];
};


export type QueryUserRecipesByRecipeAndIsUploadedArgs = {
  isUploaded: Scalars['Boolean'];
  recipeID: Scalars['Float'];
};


export type QueryUserRecipesByUserArgs = {
  userID: Scalars['String'];
};


export type QueryUserRecipesByUserAndIsCommentExistsArgs = {
  userID: Scalars['String'];
};


export type QueryUserRecipesByUserAndIsSavedArgs = {
  isSaved: Scalars['Boolean'];
  userID: Scalars['String'];
};


export type QueryUserRecipesByUserAndIsUploadedArgs = {
  isUploaded: Scalars['Boolean'];
  userID: Scalars['String'];
};


export type QueryUserRecipesByUserAndRecipeArgs = {
  recipeID: Scalars['Float'];
  userID: Scalars['String'];
};


export type QueryUserRecipesByUserWithRecipeArgs = {
  userID: Scalars['String'];
};

export type Ratings = {
  __typename?: 'Ratings';
  rating: Scalars['Float'];
  rating_timestamp: Scalars['DateTime'];
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

export type Userrecipes = {
  __typename?: 'Userrecipes';
  given_comment: Scalars['String'];
  is_saved: Scalars['Boolean'];
  is_uploaded: Scalars['Boolean'];
  recipe: Recipes;
  recipe_index: Scalars['Float'];
  user_id: Scalars['String'];
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

export type CreateUserRecipesMutationVariables = Exact<{
  user_id: Scalars['String'];
  recipe_index: Scalars['Float'];
  is_saved: Scalars['Boolean'];
  is_uploaded: Scalars['Boolean'];
  given_comment: Scalars['String'];
}>;


export type CreateUserRecipesMutation = { __typename?: 'Mutation', createUserRecipes: { __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string } };

export type RemoveUserRecipesMutationVariables = Exact<{
  user_id: Scalars['String'];
  recipe_index: Scalars['Float'];
}>;


export type RemoveUserRecipesMutation = { __typename?: 'Mutation', removeUserRecipes: { __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string } };

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


export type GetRatingsByUserIdQuery = { __typename?: 'Query', ratingsByUser: Array<{ __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number }> };

export type GetRatingsByRecipeIndexQueryVariables = Exact<{
  index: Scalars['Float'];
}>;


export type GetRatingsByRecipeIndexQuery = { __typename?: 'Query', ratingsByRecipe: Array<{ __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number }> };

export type GetRatingByRecipeAndUserQueryVariables = Exact<{
  id: Scalars['String'];
  index: Scalars['Float'];
}>;


export type GetRatingByRecipeAndUserQuery = { __typename?: 'Query', ratingByUserAndRecipe: { __typename?: 'Ratings', user_id: string, recipe_index: number, rating: number } };

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetRecipeByIdQueryVariables = Exact<{
  index: Scalars['Float'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number } };

export type GetRecipesBySearchQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type GetRecipesBySearchQuery = { __typename?: 'Query', recipesByValue: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetTopRatedRecipesByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetTopRatedRecipesByCategoryQuery = { __typename?: 'Query', topRecipesByCategory: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetTopRatedRecipesByCuisineQueryVariables = Exact<{
  cuisine: Scalars['String'];
}>;


export type GetTopRatedRecipesByCuisineQuery = { __typename?: 'Query', topRecipesByCuisine: Array<{ __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number }> };

export type GetAllUserrecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserrecipesQuery = { __typename?: 'Query', userRecipes: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByUserIdQueryVariables = Exact<{
  userID: Scalars['String'];
}>;


export type GetUserrecipesByUserIdQuery = { __typename?: 'Query', userRecipesByUser: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByRecipeIndexQueryVariables = Exact<{
  recipeID: Scalars['Float'];
}>;


export type GetUserrecipesByRecipeIndexQuery = { __typename?: 'Query', userRecipesByRecipe: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByRecipeIndexAndIsSavedQueryVariables = Exact<{
  recipeID: Scalars['Float'];
  isSaved: Scalars['Boolean'];
}>;


export type GetUserrecipesByRecipeIndexAndIsSavedQuery = { __typename?: 'Query', userRecipesByRecipeAndIsSaved: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByUserAndIsSavedQueryVariables = Exact<{
  userID: Scalars['String'];
  isSaved: Scalars['Boolean'];
}>;


export type GetUserrecipesByUserAndIsSavedQuery = { __typename?: 'Query', userRecipesByUserAndIsSaved: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByRecipeIndexAndIsUploadedQueryVariables = Exact<{
  recipeID: Scalars['Float'];
  isUploaded: Scalars['Boolean'];
}>;


export type GetUserrecipesByRecipeIndexAndIsUploadedQuery = { __typename?: 'Query', userRecipesByRecipeAndIsUploaded: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByUserAndIsUploadedQueryVariables = Exact<{
  userID: Scalars['String'];
  isUploaded: Scalars['Boolean'];
}>;


export type GetUserrecipesByUserAndIsUploadedQuery = { __typename?: 'Query', userRecipesByUserAndIsUploaded: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByRecipeIndexAndCommentQueryVariables = Exact<{
  recipeID: Scalars['Float'];
}>;


export type GetUserrecipesByRecipeIndexAndCommentQuery = { __typename?: 'Query', userRecipesByRecipeAndIsCommentExists: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByUserAndCommentQueryVariables = Exact<{
  userID: Scalars['String'];
}>;


export type GetUserrecipesByUserAndCommentQuery = { __typename?: 'Query', userRecipesByUserAndIsCommentExists: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string }> };

export type GetUserrecipesByRecipeAndUserQueryVariables = Exact<{
  userID: Scalars['String'];
  recipeID: Scalars['Float'];
}>;


export type GetUserrecipesByRecipeAndUserQuery = { __typename?: 'Query', userRecipesByUserAndRecipe: { __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string } };

export type GetUserrecipesByUserWithRecipeQueryVariables = Exact<{
  userID: Scalars['String'];
}>;


export type GetUserrecipesByUserWithRecipeQuery = { __typename?: 'Query', userRecipesByUserWithRecipe: Array<{ __typename?: 'Userrecipes', user_id: string, recipe_index: number, is_saved: boolean, is_uploaded: boolean, given_comment: string, recipe: { __typename?: 'Recipes', index: number, recipe_title: string, url: string, record_health: string, vote_count: number, rating: number, description: string, cuisine: string, course: string, diet: string, prep_time: number, cook_time: number, ingredients: string, instructions: string, author: string, tags: string, category: string, image: string, difficulty: string, total_time: number } }> };

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
export const CreateUserRecipesDocument = gql`
    mutation createUserRecipes($user_id: String!, $recipe_index: Float!, $is_saved: Boolean!, $is_uploaded: Boolean!, $given_comment: String!) {
  createUserRecipes(
    user_id: $user_id
    recipe_index: $recipe_index
    is_saved: $is_saved
    is_uploaded: $is_uploaded
    given_comment: $given_comment
  ) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;
export type CreateUserRecipesMutationFn = Apollo.MutationFunction<CreateUserRecipesMutation, CreateUserRecipesMutationVariables>;

/**
 * __useCreateUserRecipesMutation__
 *
 * To run a mutation, you first call `useCreateUserRecipesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserRecipesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserRecipesMutation, { data, loading, error }] = useCreateUserRecipesMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      recipe_index: // value for 'recipe_index'
 *      is_saved: // value for 'is_saved'
 *      is_uploaded: // value for 'is_uploaded'
 *      given_comment: // value for 'given_comment'
 *   },
 * });
 */
export function useCreateUserRecipesMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserRecipesMutation, CreateUserRecipesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserRecipesMutation, CreateUserRecipesMutationVariables>(CreateUserRecipesDocument, options);
      }
export type CreateUserRecipesMutationHookResult = ReturnType<typeof useCreateUserRecipesMutation>;
export type CreateUserRecipesMutationResult = Apollo.MutationResult<CreateUserRecipesMutation>;
export type CreateUserRecipesMutationOptions = Apollo.BaseMutationOptions<CreateUserRecipesMutation, CreateUserRecipesMutationVariables>;
export const RemoveUserRecipesDocument = gql`
    mutation RemoveUserRecipes($user_id: String!, $recipe_index: Float!) {
  removeUserRecipes(userID: $user_id, recipeID: $recipe_index) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;
export type RemoveUserRecipesMutationFn = Apollo.MutationFunction<RemoveUserRecipesMutation, RemoveUserRecipesMutationVariables>;

/**
 * __useRemoveUserRecipesMutation__
 *
 * To run a mutation, you first call `useRemoveUserRecipesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserRecipesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserRecipesMutation, { data, loading, error }] = useRemoveUserRecipesMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      recipe_index: // value for 'recipe_index'
 *   },
 * });
 */
export function useRemoveUserRecipesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserRecipesMutation, RemoveUserRecipesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserRecipesMutation, RemoveUserRecipesMutationVariables>(RemoveUserRecipesDocument, options);
      }
export type RemoveUserRecipesMutationHookResult = ReturnType<typeof useRemoveUserRecipesMutation>;
export type RemoveUserRecipesMutationResult = Apollo.MutationResult<RemoveUserRecipesMutation>;
export type RemoveUserRecipesMutationOptions = Apollo.BaseMutationOptions<RemoveUserRecipesMutation, RemoveUserRecipesMutationVariables>;
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
export const GetRatingByRecipeAndUserDocument = gql`
    query getRatingByRecipeAndUser($id: String!, $index: Float!) {
  ratingByUserAndRecipe(id: $id, index: $index) {
    user_id
    recipe_index
    rating
  }
}
    `;

/**
 * __useGetRatingByRecipeAndUserQuery__
 *
 * To run a query within a React component, call `useGetRatingByRecipeAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingByRecipeAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingByRecipeAndUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useGetRatingByRecipeAndUserQuery(baseOptions: Apollo.QueryHookOptions<GetRatingByRecipeAndUserQuery, GetRatingByRecipeAndUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingByRecipeAndUserQuery, GetRatingByRecipeAndUserQueryVariables>(GetRatingByRecipeAndUserDocument, options);
      }
export function useGetRatingByRecipeAndUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingByRecipeAndUserQuery, GetRatingByRecipeAndUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingByRecipeAndUserQuery, GetRatingByRecipeAndUserQueryVariables>(GetRatingByRecipeAndUserDocument, options);
        }
export type GetRatingByRecipeAndUserQueryHookResult = ReturnType<typeof useGetRatingByRecipeAndUserQuery>;
export type GetRatingByRecipeAndUserLazyQueryHookResult = ReturnType<typeof useGetRatingByRecipeAndUserLazyQuery>;
export type GetRatingByRecipeAndUserQueryResult = Apollo.QueryResult<GetRatingByRecipeAndUserQuery, GetRatingByRecipeAndUserQueryVariables>;
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
export const GetRecipesBySearchDocument = gql`
    query getRecipesBySearch($value: String!) {
  recipesByValue(value: $value) {
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
 * __useGetRecipesBySearchQuery__
 *
 * To run a query within a React component, call `useGetRecipesBySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesBySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesBySearchQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useGetRecipesBySearchQuery(baseOptions: Apollo.QueryHookOptions<GetRecipesBySearchQuery, GetRecipesBySearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesBySearchQuery, GetRecipesBySearchQueryVariables>(GetRecipesBySearchDocument, options);
      }
export function useGetRecipesBySearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesBySearchQuery, GetRecipesBySearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesBySearchQuery, GetRecipesBySearchQueryVariables>(GetRecipesBySearchDocument, options);
        }
export type GetRecipesBySearchQueryHookResult = ReturnType<typeof useGetRecipesBySearchQuery>;
export type GetRecipesBySearchLazyQueryHookResult = ReturnType<typeof useGetRecipesBySearchLazyQuery>;
export type GetRecipesBySearchQueryResult = Apollo.QueryResult<GetRecipesBySearchQuery, GetRecipesBySearchQueryVariables>;
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
export const GetAllUserrecipesDocument = gql`
    query getAllUserrecipes {
  userRecipes {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetAllUserrecipesQuery__
 *
 * To run a query within a React component, call `useGetAllUserrecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserrecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserrecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserrecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserrecipesQuery, GetAllUserrecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserrecipesQuery, GetAllUserrecipesQueryVariables>(GetAllUserrecipesDocument, options);
      }
export function useGetAllUserrecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserrecipesQuery, GetAllUserrecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserrecipesQuery, GetAllUserrecipesQueryVariables>(GetAllUserrecipesDocument, options);
        }
export type GetAllUserrecipesQueryHookResult = ReturnType<typeof useGetAllUserrecipesQuery>;
export type GetAllUserrecipesLazyQueryHookResult = ReturnType<typeof useGetAllUserrecipesLazyQuery>;
export type GetAllUserrecipesQueryResult = Apollo.QueryResult<GetAllUserrecipesQuery, GetAllUserrecipesQueryVariables>;
export const GetUserrecipesByUserIdDocument = gql`
    query getUserrecipesByUserId($userID: String!) {
  userRecipesByUser(userID: $userID) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByUserIdQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useGetUserrecipesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByUserIdQuery, GetUserrecipesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByUserIdQuery, GetUserrecipesByUserIdQueryVariables>(GetUserrecipesByUserIdDocument, options);
      }
export function useGetUserrecipesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByUserIdQuery, GetUserrecipesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByUserIdQuery, GetUserrecipesByUserIdQueryVariables>(GetUserrecipesByUserIdDocument, options);
        }
export type GetUserrecipesByUserIdQueryHookResult = ReturnType<typeof useGetUserrecipesByUserIdQuery>;
export type GetUserrecipesByUserIdLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByUserIdLazyQuery>;
export type GetUserrecipesByUserIdQueryResult = Apollo.QueryResult<GetUserrecipesByUserIdQuery, GetUserrecipesByUserIdQueryVariables>;
export const GetUserrecipesByRecipeIndexDocument = gql`
    query getUserrecipesByRecipeIndex($recipeID: Float!) {
  userRecipesByRecipe(recipeID: $recipeID) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByRecipeIndexQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByRecipeIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByRecipeIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByRecipeIndexQuery({
 *   variables: {
 *      recipeID: // value for 'recipeID'
 *   },
 * });
 */
export function useGetUserrecipesByRecipeIndexQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByRecipeIndexQuery, GetUserrecipesByRecipeIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByRecipeIndexQuery, GetUserrecipesByRecipeIndexQueryVariables>(GetUserrecipesByRecipeIndexDocument, options);
      }
export function useGetUserrecipesByRecipeIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByRecipeIndexQuery, GetUserrecipesByRecipeIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByRecipeIndexQuery, GetUserrecipesByRecipeIndexQueryVariables>(GetUserrecipesByRecipeIndexDocument, options);
        }
export type GetUserrecipesByRecipeIndexQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexQuery>;
export type GetUserrecipesByRecipeIndexLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexLazyQuery>;
export type GetUserrecipesByRecipeIndexQueryResult = Apollo.QueryResult<GetUserrecipesByRecipeIndexQuery, GetUserrecipesByRecipeIndexQueryVariables>;
export const GetUserrecipesByRecipeIndexAndIsSavedDocument = gql`
    query getUserrecipesByRecipeIndexAndIsSaved($recipeID: Float!, $isSaved: Boolean!) {
  userRecipesByRecipeAndIsSaved(recipeID: $recipeID, isSaved: $isSaved) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByRecipeIndexAndIsSavedQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByRecipeIndexAndIsSavedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByRecipeIndexAndIsSavedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByRecipeIndexAndIsSavedQuery({
 *   variables: {
 *      recipeID: // value for 'recipeID'
 *      isSaved: // value for 'isSaved'
 *   },
 * });
 */
export function useGetUserrecipesByRecipeIndexAndIsSavedQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByRecipeIndexAndIsSavedQuery, GetUserrecipesByRecipeIndexAndIsSavedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByRecipeIndexAndIsSavedQuery, GetUserrecipesByRecipeIndexAndIsSavedQueryVariables>(GetUserrecipesByRecipeIndexAndIsSavedDocument, options);
      }
export function useGetUserrecipesByRecipeIndexAndIsSavedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByRecipeIndexAndIsSavedQuery, GetUserrecipesByRecipeIndexAndIsSavedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByRecipeIndexAndIsSavedQuery, GetUserrecipesByRecipeIndexAndIsSavedQueryVariables>(GetUserrecipesByRecipeIndexAndIsSavedDocument, options);
        }
export type GetUserrecipesByRecipeIndexAndIsSavedQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexAndIsSavedQuery>;
export type GetUserrecipesByRecipeIndexAndIsSavedLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexAndIsSavedLazyQuery>;
export type GetUserrecipesByRecipeIndexAndIsSavedQueryResult = Apollo.QueryResult<GetUserrecipesByRecipeIndexAndIsSavedQuery, GetUserrecipesByRecipeIndexAndIsSavedQueryVariables>;
export const GetUserrecipesByUserAndIsSavedDocument = gql`
    query getUserrecipesByUserAndIsSaved($userID: String!, $isSaved: Boolean!) {
  userRecipesByUserAndIsSaved(userID: $userID, isSaved: $isSaved) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByUserAndIsSavedQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByUserAndIsSavedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByUserAndIsSavedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByUserAndIsSavedQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *      isSaved: // value for 'isSaved'
 *   },
 * });
 */
export function useGetUserrecipesByUserAndIsSavedQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByUserAndIsSavedQuery, GetUserrecipesByUserAndIsSavedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByUserAndIsSavedQuery, GetUserrecipesByUserAndIsSavedQueryVariables>(GetUserrecipesByUserAndIsSavedDocument, options);
      }
export function useGetUserrecipesByUserAndIsSavedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByUserAndIsSavedQuery, GetUserrecipesByUserAndIsSavedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByUserAndIsSavedQuery, GetUserrecipesByUserAndIsSavedQueryVariables>(GetUserrecipesByUserAndIsSavedDocument, options);
        }
export type GetUserrecipesByUserAndIsSavedQueryHookResult = ReturnType<typeof useGetUserrecipesByUserAndIsSavedQuery>;
export type GetUserrecipesByUserAndIsSavedLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByUserAndIsSavedLazyQuery>;
export type GetUserrecipesByUserAndIsSavedQueryResult = Apollo.QueryResult<GetUserrecipesByUserAndIsSavedQuery, GetUserrecipesByUserAndIsSavedQueryVariables>;
export const GetUserrecipesByRecipeIndexAndIsUploadedDocument = gql`
    query getUserrecipesByRecipeIndexAndIsUploaded($recipeID: Float!, $isUploaded: Boolean!) {
  userRecipesByRecipeAndIsUploaded(recipeID: $recipeID, isUploaded: $isUploaded) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByRecipeIndexAndIsUploadedQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByRecipeIndexAndIsUploadedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByRecipeIndexAndIsUploadedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByRecipeIndexAndIsUploadedQuery({
 *   variables: {
 *      recipeID: // value for 'recipeID'
 *      isUploaded: // value for 'isUploaded'
 *   },
 * });
 */
export function useGetUserrecipesByRecipeIndexAndIsUploadedQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByRecipeIndexAndIsUploadedQuery, GetUserrecipesByRecipeIndexAndIsUploadedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByRecipeIndexAndIsUploadedQuery, GetUserrecipesByRecipeIndexAndIsUploadedQueryVariables>(GetUserrecipesByRecipeIndexAndIsUploadedDocument, options);
      }
export function useGetUserrecipesByRecipeIndexAndIsUploadedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByRecipeIndexAndIsUploadedQuery, GetUserrecipesByRecipeIndexAndIsUploadedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByRecipeIndexAndIsUploadedQuery, GetUserrecipesByRecipeIndexAndIsUploadedQueryVariables>(GetUserrecipesByRecipeIndexAndIsUploadedDocument, options);
        }
export type GetUserrecipesByRecipeIndexAndIsUploadedQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexAndIsUploadedQuery>;
export type GetUserrecipesByRecipeIndexAndIsUploadedLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexAndIsUploadedLazyQuery>;
export type GetUserrecipesByRecipeIndexAndIsUploadedQueryResult = Apollo.QueryResult<GetUserrecipesByRecipeIndexAndIsUploadedQuery, GetUserrecipesByRecipeIndexAndIsUploadedQueryVariables>;
export const GetUserrecipesByUserAndIsUploadedDocument = gql`
    query getUserrecipesByUserAndIsUploaded($userID: String!, $isUploaded: Boolean!) {
  userRecipesByUserAndIsUploaded(userID: $userID, isUploaded: $isUploaded) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByUserAndIsUploadedQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByUserAndIsUploadedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByUserAndIsUploadedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByUserAndIsUploadedQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *      isUploaded: // value for 'isUploaded'
 *   },
 * });
 */
export function useGetUserrecipesByUserAndIsUploadedQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByUserAndIsUploadedQuery, GetUserrecipesByUserAndIsUploadedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByUserAndIsUploadedQuery, GetUserrecipesByUserAndIsUploadedQueryVariables>(GetUserrecipesByUserAndIsUploadedDocument, options);
      }
export function useGetUserrecipesByUserAndIsUploadedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByUserAndIsUploadedQuery, GetUserrecipesByUserAndIsUploadedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByUserAndIsUploadedQuery, GetUserrecipesByUserAndIsUploadedQueryVariables>(GetUserrecipesByUserAndIsUploadedDocument, options);
        }
export type GetUserrecipesByUserAndIsUploadedQueryHookResult = ReturnType<typeof useGetUserrecipesByUserAndIsUploadedQuery>;
export type GetUserrecipesByUserAndIsUploadedLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByUserAndIsUploadedLazyQuery>;
export type GetUserrecipesByUserAndIsUploadedQueryResult = Apollo.QueryResult<GetUserrecipesByUserAndIsUploadedQuery, GetUserrecipesByUserAndIsUploadedQueryVariables>;
export const GetUserrecipesByRecipeIndexAndCommentDocument = gql`
    query getUserrecipesByRecipeIndexAndComment($recipeID: Float!) {
  userRecipesByRecipeAndIsCommentExists(recipeID: $recipeID) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByRecipeIndexAndCommentQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByRecipeIndexAndCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByRecipeIndexAndCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByRecipeIndexAndCommentQuery({
 *   variables: {
 *      recipeID: // value for 'recipeID'
 *   },
 * });
 */
export function useGetUserrecipesByRecipeIndexAndCommentQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByRecipeIndexAndCommentQuery, GetUserrecipesByRecipeIndexAndCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByRecipeIndexAndCommentQuery, GetUserrecipesByRecipeIndexAndCommentQueryVariables>(GetUserrecipesByRecipeIndexAndCommentDocument, options);
      }
export function useGetUserrecipesByRecipeIndexAndCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByRecipeIndexAndCommentQuery, GetUserrecipesByRecipeIndexAndCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByRecipeIndexAndCommentQuery, GetUserrecipesByRecipeIndexAndCommentQueryVariables>(GetUserrecipesByRecipeIndexAndCommentDocument, options);
        }
export type GetUserrecipesByRecipeIndexAndCommentQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexAndCommentQuery>;
export type GetUserrecipesByRecipeIndexAndCommentLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeIndexAndCommentLazyQuery>;
export type GetUserrecipesByRecipeIndexAndCommentQueryResult = Apollo.QueryResult<GetUserrecipesByRecipeIndexAndCommentQuery, GetUserrecipesByRecipeIndexAndCommentQueryVariables>;
export const GetUserrecipesByUserAndCommentDocument = gql`
    query getUserrecipesByUserAndComment($userID: String!) {
  userRecipesByUserAndIsCommentExists(userID: $userID) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByUserAndCommentQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByUserAndCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByUserAndCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByUserAndCommentQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useGetUserrecipesByUserAndCommentQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByUserAndCommentQuery, GetUserrecipesByUserAndCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByUserAndCommentQuery, GetUserrecipesByUserAndCommentQueryVariables>(GetUserrecipesByUserAndCommentDocument, options);
      }
export function useGetUserrecipesByUserAndCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByUserAndCommentQuery, GetUserrecipesByUserAndCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByUserAndCommentQuery, GetUserrecipesByUserAndCommentQueryVariables>(GetUserrecipesByUserAndCommentDocument, options);
        }
export type GetUserrecipesByUserAndCommentQueryHookResult = ReturnType<typeof useGetUserrecipesByUserAndCommentQuery>;
export type GetUserrecipesByUserAndCommentLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByUserAndCommentLazyQuery>;
export type GetUserrecipesByUserAndCommentQueryResult = Apollo.QueryResult<GetUserrecipesByUserAndCommentQuery, GetUserrecipesByUserAndCommentQueryVariables>;
export const GetUserrecipesByRecipeAndUserDocument = gql`
    query getUserrecipesByRecipeAndUser($userID: String!, $recipeID: Float!) {
  userRecipesByUserAndRecipe(userID: $userID, recipeID: $recipeID) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
  }
}
    `;

/**
 * __useGetUserrecipesByRecipeAndUserQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByRecipeAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByRecipeAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByRecipeAndUserQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *      recipeID: // value for 'recipeID'
 *   },
 * });
 */
export function useGetUserrecipesByRecipeAndUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByRecipeAndUserQuery, GetUserrecipesByRecipeAndUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByRecipeAndUserQuery, GetUserrecipesByRecipeAndUserQueryVariables>(GetUserrecipesByRecipeAndUserDocument, options);
      }
export function useGetUserrecipesByRecipeAndUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByRecipeAndUserQuery, GetUserrecipesByRecipeAndUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByRecipeAndUserQuery, GetUserrecipesByRecipeAndUserQueryVariables>(GetUserrecipesByRecipeAndUserDocument, options);
        }
export type GetUserrecipesByRecipeAndUserQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeAndUserQuery>;
export type GetUserrecipesByRecipeAndUserLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByRecipeAndUserLazyQuery>;
export type GetUserrecipesByRecipeAndUserQueryResult = Apollo.QueryResult<GetUserrecipesByRecipeAndUserQuery, GetUserrecipesByRecipeAndUserQueryVariables>;
export const GetUserrecipesByUserWithRecipeDocument = gql`
    query getUserrecipesByUserWithRecipe($userID: String!) {
  userRecipesByUserWithRecipe(userID: $userID) {
    user_id
    recipe_index
    is_saved
    is_uploaded
    given_comment
    recipe {
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
}
    `;

/**
 * __useGetUserrecipesByUserWithRecipeQuery__
 *
 * To run a query within a React component, call `useGetUserrecipesByUserWithRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserrecipesByUserWithRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserrecipesByUserWithRecipeQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useGetUserrecipesByUserWithRecipeQuery(baseOptions: Apollo.QueryHookOptions<GetUserrecipesByUserWithRecipeQuery, GetUserrecipesByUserWithRecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserrecipesByUserWithRecipeQuery, GetUserrecipesByUserWithRecipeQueryVariables>(GetUserrecipesByUserWithRecipeDocument, options);
      }
export function useGetUserrecipesByUserWithRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserrecipesByUserWithRecipeQuery, GetUserrecipesByUserWithRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserrecipesByUserWithRecipeQuery, GetUserrecipesByUserWithRecipeQueryVariables>(GetUserrecipesByUserWithRecipeDocument, options);
        }
export type GetUserrecipesByUserWithRecipeQueryHookResult = ReturnType<typeof useGetUserrecipesByUserWithRecipeQuery>;
export type GetUserrecipesByUserWithRecipeLazyQueryHookResult = ReturnType<typeof useGetUserrecipesByUserWithRecipeLazyQuery>;
export type GetUserrecipesByUserWithRecipeQueryResult = Apollo.QueryResult<GetUserrecipesByUserWithRecipeQuery, GetUserrecipesByUserWithRecipeQueryVariables>;
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