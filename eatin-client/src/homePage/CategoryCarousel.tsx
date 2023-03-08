import { FC } from "react";
import { Button, Rating } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Carousel, CarouselItem, CarouselProps } from "../components/ui/Carousel";
import { useNavigate } from "react-router-dom";

export class Recipe {
    index: string;
    recipe_title: string;
    url?: string;
    record_health?: string;
    vote_count?: string;
    rating: string;
    description?: string;
    cuisine?: string;
    course?: string;
    diet?: string;
    prep_time?: string;
    cook_time?: string;
    ingredients?: string;
    instructions?: string;
    author?: string;
    tags?: string;
    category?: string;
    image: string;
    difficulty?: string;

    constructor(
        index: string,
        recipe_title: string,
        url: string,
        record_health: string,
        vote_count: string,
        rating: string,
        description: string,
        cuisine: string,
        course: string,
        diet: string,
        prep_time: string,
        cook_time: string,
        ingredients: string,
        instructions: string,
        author: string,
        tags: string,
        category: string,
        image: string,
        difficulty: string,
    ) {
        this.index = index;
        this.recipe_title = recipe_title;
        this.url = url;
        this.record_health = record_health;
        this.vote_count = vote_count;
        this.rating = rating;
        this.description = description;
        this.cuisine = cuisine;
        this.course = course;
        this.diet = diet;
        this.prep_time = prep_time;
        this.cook_time = cook_time;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.author = author;
        this.tags = tags;
        this.category = category;
        this.image = image;
        this.difficulty = difficulty;
    }
}

export class Item implements Recipe {
    index: string;
    recipe_title: string;
    url?: string;
    record_health?: string;
    vote_count?: string;
    rating: string;
    description?: string;
    cuisine?: string;
    course?: string;
    diet?: string;
    prep_time?: string;
    cook_time?: string;
    ingredients?: string;
    instructions?: string;
    author?: string;
    tags?: string;
    category?: string;
    image: string;
    difficulty?: string;
    onClick?: (id: string) => void;

    constructor(
        index: string,
        recipe_title: string,
        url: string,
        record_health: string,
        vote_count: string,
        rating: string,
        description: string,
        cuisine: string,
        course: string,
        diet: string,
        prep_time: string,
        cook_time: string,
        ingredients: string,
        instructions: string,
        author: string,
        tags: string,
        category: string,
        image: string,
        difficulty: string,
    ) {
        this.index = index;
        this.recipe_title = recipe_title;
        this.url = url;
        this.record_health = record_health;
        this.vote_count = vote_count;
        this.rating = rating;
        this.description = description;
        this.cuisine = cuisine;
        this.course = course;
        this.diet = diet;
        this.prep_time = prep_time;
        this.cook_time = cook_time;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.author = author;
        this.tags = tags;
        this.category = category;
        this.image = image;
        this.difficulty = difficulty;
    }
}

type Props = Omit<CarouselProps, "items"> & {
    items: Item[];
};

export const CategoryCarousel: FC<Props> = ({ items, ...props }) => {
    const navigate = useNavigate();

    const carouselItems: CarouselItem<Item>[] = items.map(({ image, index, recipe_title }, i) => ({
        image,
        index,
        title: recipe_title,
        itemValue: items[i],
        renderItem: ({ rating, vote_count }) => (
            <>
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
                        value={parseFloat(rating)}
                        readOnly
                        max={5}
                    />
                    <span className="viewed-number">{vote_count}</span>
                </div>
            </>
        ),
    }));

    return (
        <Carousel
            {...props}
            onClickItem={(id: string) => navigate("/recipe/" + id)}
            items={carouselItems}
        />
    );
};
