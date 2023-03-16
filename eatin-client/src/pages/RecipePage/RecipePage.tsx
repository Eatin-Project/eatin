import "./RecipePage.css";

import { Rating } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../../generated/graphql";
import { BookmarkButton } from "../../components/ui/BookmarkButton";
import { Comment } from "../../components/ui/Comment";
import { RecipeImageCarousel } from "./RecipeImageCarousel";
import { User } from "../../components/ui/User";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";

export const RecipePage: FC = () => {
    const { id } = useParams();

    const [rating, setRating] = useState<number | null>(0);
    const [isSaved, setIsSaved] = useState(false);

    const { data, loading } = useGetRecipeByIdQuery({ variables: { index: Number(id) } });
    const recipe = data?.recipe;

    if (loading) return <AsyncDataLoaderWrapper loading text="loading recipe page..." />;
    if (!recipe) return <h2>Recipe does not exist :)</h2>;

    const {
        author,
        image,
        recipe_title,
        ingredients,
        instructions,
        description,
        cuisine,
        course,
        cook_time,
        tags,
        category,
        diet,
        difficulty,
        record_health,
        prep_time,
        vote_count,
        url,
    } = recipe;

    return (
        <div className="recipe-page">
            <div className="right-side">
                <div className="recipe-media">
                    <div className="above-image">
                        <User name={author}>
                            <Rating
                                className="recipe-rating"
                                size="large"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                precision={0.5}
                            />
                            <span className="tag">{vote_count}</span>
                        </User>
                        <BookmarkButton value={isSaved} onChange={setIsSaved} size="large" />
                    </div>
                    <RecipeImageCarousel images={[image, image]} />
                </div>
                <div className="comments">
                    {comments.map((comment) => (
                        <Comment {...comment} />
                    ))}
                </div>
            </div>
            <div className="recipe-data">
                <div className="tags">
                    <h4>{recipe_title}</h4>
                    {[
                        "category: " + category,
                        "cuisine: " + cuisine,
                        "course: " + course,
                        "record health: " + record_health,
                        "prep time: " + prep_time,
                        "cook time: " + cook_time,
                        "diet: " + diet,
                        "difficulty: " + difficulty,
                    ].map((tag) => (
                        <span className="tag" key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <p>{description}</p>
                <h5>ingredients:</h5>
                <ul className="ingredients-list">
                    {_parseStringArray(ingredients).map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
                <h5>How to cook?</h5>
                <ol>
                    {_parseStringArray(instructions).map((instruction) => (
                        <li key={instruction}>{instruction}</li>
                    ))}
                </ol>
                <div className="tags">
                    <h5>Tags: </h5>
                    {_parseStringArray(tags).map((tag) => (
                        <span className="tag" key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="url">
                    source url:{" "}
                    <a href={url} target="_blank" rel="noreferrer">
                        {url}
                    </a>
                </div>
            </div>
        </div>
    );
};

const _parseStringArray = (str: string | undefined): string[] => {
    if (!str) return [];

    try {
        return JSON.parse(
            "[" +
                str
                    .substring(1, str.length - 1)
                    .replaceAll('\\"', '"')
                    .replaceAll(",/ ", "")
                    .replaceAll("/", "") +
                "]",
        );
    } catch (e) {
        return ["problem parsing string to json", "fix is coming soon! :D"];
    }
};

const comments = [
    { user: "shirley", content: "looks great!!" },
    { user: "shirley", content: "cooked this at home, it was amazing!" },
    { user: "shirley", content: "too much suger for me" },
    { user: "shirley", content: "super tasty" },
    { user: "shirley", content: "looks great!!!" },
    {
        user: "shirley",
        content: `This cake is rich and wholesome at the same time. Once you have tasted it, you will want to make an extra one and save it for New Year's as well!`,
    },
];
