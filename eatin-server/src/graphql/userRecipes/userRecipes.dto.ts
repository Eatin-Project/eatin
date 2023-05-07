import { Recipes } from '../recipes/recipes.model';

export interface UserrecipeDTO {
  user_id: string;
  recipe_index: number;
  is_saved: boolean;
  is_uploaded: boolean;
  given_comment: string;
}
