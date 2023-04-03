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
    is_saved?: boolean;
    is_uploaded?: boolean;
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

export interface FilterWrapper {
    field: keyof Recipe;
    filter: string;
    operator: (item: Recipe, field: keyof Recipe, filter: string) => void;
}
