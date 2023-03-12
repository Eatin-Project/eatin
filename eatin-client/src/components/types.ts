export interface Recipe {
    index: number;
    recipe_title: string;
    url?: string;
    record_health?: string;
    vote_count?: number;
    rating: number;
    description?: string;
    cuisine?: string;
    course?: string;
    diet?: string;
    prep_time?: number;
    cook_time?: number;
    ingredients?: string;
    instructions?: string;
    author?: string;
    tags?: string;
    category?: string;
    image: string;
    difficulty?: string;
    total_time?: number;
}
