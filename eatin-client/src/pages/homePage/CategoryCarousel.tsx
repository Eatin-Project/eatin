import { FC } from "react";
import { Carousel, CarouselProps } from "../../components/ui/Carousel";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../components/types";
import { ICarouselItem } from "../../components/ui/CarouselItem";

type Props = Omit<CarouselProps, "items"> & {
    items: Recipe[];
    updateSavedRecipes: (isSaved: boolean, recipeIndex: number) => void;
};

export const CategoryCarousel: FC<Props> = ({ items, updateSavedRecipes, ...props }) => {
    const navigate = useNavigate();

    const carouselItems: ICarouselItem<any>[] = items.map(
        ({ image, index, recipe_title, is_saved, rating }, i) => ({
            image,
            id: index,
            title: recipe_title,
            itemValue: items[i],
            rating: rating,
            isSaved: is_saved,
            updateSavedRecipes: updateSavedRecipes,
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
