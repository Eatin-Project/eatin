import "./RecipesCatalog.css";

import {FC} from "react";
import {Recipe} from "../types";
import {RecipeItem} from "./RecipeItem";
import {CarouselItem} from "./CarouselItem";
import {useNavigate} from "react-router-dom";

type Props = {
    recipes: Recipe[];
};

export const RecipesCatalog: FC<Props> = ({recipes}) => {
    const updatedRecipesSavedState = (recipeIndex: number) => {
        const index = recipes.findIndex((item) => item.index === recipeIndex);
        recipes[index].is_saved = !recipes[index].is_saved;
    };

    const navigate = useNavigate();


    return (
        <div className="recipes-catalog">
            {recipes.map((recipe) => (
                // <RecipeItem
                //     recipe={recipe}
                //     key={recipe.index}
                //     updateSavedRecipes={updatedRecipesSavedState}
                // />
                <CarouselItem
                    id={recipe.index} isSaved={recipe.is_saved} key={recipe.index}
                    updatedRecipesSavedState={updatedRecipesSavedState}
                    onClick={(id: number) => navigate("/recipe/" + id)}
                    image={recipe.image} rating={recipe.rating} title={recipe.recipe_title}/>
            ))}
        </div>
    );
};
