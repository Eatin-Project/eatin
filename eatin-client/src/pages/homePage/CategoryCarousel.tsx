import "./CategoryCarousel.css";

import { FC, useState } from "react";
import { Button, Rating } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Carousel, CarouselItem, CarouselProps } from "../../components/ui/Carousel";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../components/types";

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
                <CategoryCarouselItem key={index} rating={rating} vote_count={vote_count} />
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

type CategoryCarouselItemProps = Pick<Recipe, "rating" | "vote_count">;

const CategoryCarouselItem: FC<CategoryCarouselItemProps> = ({ rating, vote_count }) => {
    const [userRating, setUserRating] = useState<number | null>(null);

    return (
        <div onMouseEnter={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
            <div className="buttons-spread">
                <Rating className="is-saved" max={1} />
                <Button className="delete-from-list" size="large">
                    <CancelIcon className="delete-from-list-icon" />
                </Button>
            </div>
            <div className="item-info">
                <Rating
                    className="rating-item"
                    precision={0.5}
                    value={userRating ?? rating}
                    onChange={(e, value) => setUserRating(value)}
                    readOnly
                    max={5}
                />
                <span className="viewed-number">{vote_count}</span>
            </div>
        </div>
    );
};
