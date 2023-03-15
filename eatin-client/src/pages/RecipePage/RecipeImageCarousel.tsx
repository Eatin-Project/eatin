import "./RecipeImageCarousel.css";

import { FC } from "react";
import { Carousel } from "../../components/ui/Carousel";

interface Props {
    images: string[];
}

export const RecipeImageCarousel: FC<Props> = ({ images }) => {
    return (
        <Carousel
            className="recipe-image-carousel"
            hideArrows
            items={images.map((_) => ({
                id: _,
                image: _,
            }))}
        />
    );
};
