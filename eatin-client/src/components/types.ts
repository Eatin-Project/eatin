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
    given_comment: string;
}

export interface FilterOptions {
    name: string;
    options: string[];
    setState: (arg: string) => void;
}

export interface RecipesSection {
    name: string;
    recipes: Recipe[];
}

export type FilterableKeys = keyof Omit<Recipe, "is_saved" | "is_uploaded" | "given_comment">;

export interface FilterWrapper {
    field: FilterableKeys;
    filter: string;
    operator: (item: Recipe, field: FilterableKeys, filter: string) => void;
}
