import { FC } from "react";
import { Carousel, CarouselItem, CarouselProps } from "../../components/ui/Carousel";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../components/types";
import { RecipeItemOverlay } from "../../components/ui/RecipeItemOverlay";

type Props = Omit<CarouselProps, "items"> & {
    items: Recipe[];
    updateSavedRecipes: (isSaved: boolean, recipeIndex: number) => void;
};

export const CategoryCarousel: FC<Props> = ({ items, updateSavedRecipes, ...props }) => {
    const navigate = useNavigate();

    const carouselItems: CarouselItem<any>[] = items.map(
        ({ image, index, recipe_title, is_saved }, i) => ({
            image,
            id: index,
            title: recipe_title,
            itemValue: items[i],
            renderItem: ({ rating, vote_count, index }) => (
                <RecipeItemOverlay
                    key={index}
                    rating={rating}
                    vote_count={vote_count}
                    index={index}
                    recipe_title={recipe_title}
                    is_saved={is_saved}
                    updateSavedRecipes={updateSavedRecipes}
                />
            ),
        }),
    );

    return (
        <Carousel
            {...props}
            onClickItem={(id: number) => navigate("/recipe/" + id)}
            items={carouselItems}
        />
    );
};
