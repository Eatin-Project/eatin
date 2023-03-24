import "./CategoryCarousel.css";

import { FC, useState } from "react";
import { Button, Rating } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Carousel, CarouselItem, CarouselProps } from "../../components/ui/Carousel";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../components/types";
import { RecipeItemOverlay } from "../../components/ui/RecipeItemOverlay";

type Props = Omit<CarouselProps, "items"> & {
    items: Recipe[];
};

export const CategoryCarousel: FC<Props> = ({ items, ...props }) => {
    const navigate = useNavigate();

    const carouselItems: CarouselItem<Recipe>[] = items.map(
        ({ image, index, recipe_title }, i) => ({
            image,
            id: index,
            title: recipe_title,
            itemValue: items[i],
            renderItem: ({ rating, vote_count, index }) => (
                <RecipeItemOverlay key={index} rating={rating} vote_count={vote_count} />
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
