export interface Recipe {
    index: number;
    recipe_title: string;
    url: string;
    record_health: string;
    vote_count: number;
    rating: number;
    description: string;
    cuisine: string;
    course: string;
    diet: string;
    prep_time: number;
    cook_time: number;
    ingredients: string;
    instructions: string;
    author: string;
    tags: string;
    category: string;
    image: string;
    difficulty: string;
    total_time: number;
    is_saved: boolean;
    is_uploaded: boolean;
}

export interface Comments {
    id: string;
    user_id: string;
    recipe_index: number;
    given_comment: string;
    comment_timestap: Date;
    user_first_name?: string;
    user_last_name?: string;
}

export interface FilterOptions {
    name: string;
    options: string[];
    isMulti: boolean;
    setState: (arg: string[]) => void;
}

export interface RecipesSection {
    name: string;
    recipes: Recipe[];
}

export type FilterableKeys = keyof Omit<Recipe, "is_saved" | "is_uploaded">;

export interface FilterWrapper {
    field: FilterableKeys;
    filter: string[];
    operator: (item: Recipe, field: FilterableKeys, filter: string[]) => void;
}
