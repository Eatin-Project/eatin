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
}

export interface FilterOptions {
    name: string;
    options: string[];
    setState: (arg: string) => void;
}

export interface RecipesSection {
    name: string;
    items: Recipe[];
}

export interface FilterWrapper {
    field: string;
    filter: string;
    operator: (item: Recipe, field: string, filter: string) => void;
}
