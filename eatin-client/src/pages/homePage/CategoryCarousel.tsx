import { FC } from "react";
import { Carousel, CarouselProps } from "../../components/ui/Carousel";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../components/types";
import { ICarouselItem } from "../../components/ui/CarouselItem";

type Props = Omit<CarouselProps, "items"> & {
    items: Recipe[];
};

export const CategoryCarousel: FC<Props> = ({ items, ...props }) => {
    const navigate = useNavigate();

    const updatedRecipesSavedState = (recipeIndex: number) => {
        const index = items.findIndex((item) => item.index === recipeIndex);
        items[index].is_saved = !items[index].is_saved;
    };

    const carouselItems: ICarouselItem<any>[] = items.map(
        ({ image, index, recipe_title, is_saved, rating, is_uploaded }, i) => ({
            image,
            id: index,
            title: recipe_title,
            itemValue: items[i],
            rating: rating,
            isSaved: is_saved,
            isUploaded: is_uploaded,
            updatedRecipesSavedState: updatedRecipesSavedState,
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
