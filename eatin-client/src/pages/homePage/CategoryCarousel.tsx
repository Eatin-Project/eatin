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
    // changeRecipeSavedState: (arg0: number, arg1: string, arg2: boolean) => void;
};

export const CategoryCarousel: FC<Props> = ({ items, ...props }) => {
    const navigate = useNavigate();

    const carouselItems: CarouselItem<any>[] = items.map(
        ({ image, index, recipe_title, is_saved, is_uploaded }, i) => ({
            image,
            id: index,
            title: recipe_title,
            itemValue: items[i],
            renderItem: ({ rating, vote_count, index }) => (
                // <CategoryCarouselItem
                //     key={index}
                //     rating={rating}
                //     vote_count={vote_count}
                //     index={index}
                //     recipe_title={recipe_title}
                //     changeRecipeSavedState={changeRecipeSavedState}
                // />
                <RecipeItemOverlay
                    key={index}
                    rating={rating}
                    vote_count={vote_count}
                    index={index}
                    recipe_title={recipe_title}
                    is_saved={is_saved}
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

// type CategoryCarouselItemProps = Pick<
//     Recipe,
//     "rating" | "vote_count" | "index" | "recipe_title"
// > & {
//     changeRecipeSavedState: (arg0: number, arg1: string, arg2: boolean) => void;
// };

// const CategoryCarouselItem: FC<CategoryCarouselItemProps> = ({
//     rating,
//     vote_count,
//     index,
//     recipe_title,
//     changeRecipeSavedState,
// }) => {
//     const [userRating, setUserRating] = useState<number | null>(null);

//     return (
//         <div onMouseEnter={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
//             <div className="buttons-spread p-0">
//                 <Button className="delete-from-list p-0" size="large">
//                     <CancelIcon className="delete-from-list-icon p-0" />
//                 </Button>
//                 <Rating
//                     className="is-saved"
//                     max={1}
//                     onChange={(e, value) =>
//                         changeRecipeSavedState(index, recipe_title, value ? true : false)
//                     }
//                 />
//             </div>
//             <div className="item-info">
//                 <Rating
//                     className="rating-item"
//                     precision={0.5}
//                     value={userRating ?? rating}
//                     onChange={(e, value) => setUserRating(value)}
//                     readOnly
//                     max={5}
//                 />
//                 <span className="viewed-number">{vote_count}</span>
//             </div>
//         </div>
//     );
// };
