import {gql} from '@apollo/client';

export const CREATE_RECIPE = gql`
    mutation createRecipe($recipe_title: String!,
        $url: String!,
        $record_health: String!,
        $description: String!,
        $cuisine: String!,
        $course: String!,
        $diet: String!,
        $prep_time: String!,
        $cook_time: String!,
        $ingredients: String!,
        $instructions: String!,
        $author: String!,
        $tags: String!,
        $category: String!,
        $image: String!,
        $difficulty: String!) {
        createRecipe(recipe_title: $recipe_title, url: $url, record_health: $record_health, description: $description, cuisine: $cuisine, course: $course diet: $diet, prep_time: $prep_time, cook_time: $cook_time, ingredients: $ingredients, instructions: $instructions, author: $author, tags: $tags, category: $category, image: $image, difficulty: $difficulty) {
            recipe_title,
            url,
            record_health,
            description,
            cuisine,
            course,
            diet,
            prep_time,
            cook_time,
            ingredients,
            instructions,
            author,
            tags,
            category,
            image,
            difficulty
        }
    }
`;

