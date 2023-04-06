import "./RecipePage.css";

import { Rating } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetRecipeByIdQuery,
    useCreateRatingMutation,
    useGetRatingByRecipeAndUserQuery,
    useGetUserrecipesByRecipeAndUserQuery,
} from "../../generated/graphql";
import { BookmarkButton } from "../../components/ui/BookmarkButton";
import { Comment } from "../../components/ui/Comment";
import { RecipeImageCarousel } from "./RecipeImageCarousel";
import { User } from "../../components/ui/User";
import AsyncDataLoaderWrapper from "../../components/ui/AsyncDataLoaderWrapper";
import { useAuth } from "../../context/auth-context";
import { useToastNotification } from "../../components/functions/useToastNotification";

export const RecipePage: FC = () => {
    const { id } = useParams();
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState<number | null>(0);
    const { currentUser } = useAuth();
    const { notify } = useToastNotification();

    const { data: ratingData, loading: ratingLoading } = useGetRatingByRecipeAndUserQuery({
        variables: { id: currentUser ? currentUser?.uid : "", index: Number(id) },
    });
    const { data: recipeData, loading: recipeLoading } = useGetRecipeByIdQuery({
        variables: { index: Number(id) },
    });
    const { data: isRecipeSaved, loading: recipeSavedLoading } =
        useGetUserrecipesByRecipeAndUserQuery({
            variables: { recipeID: Number(id), userID: currentUser ? currentUser?.uid : "" },
        });
    const recipe = recipeData?.recipe;
    const [createRating] = useCreateRatingMutation();

    useEffect(() => {
        setRating(ratingData ? ratingData.ratingByUserAndRecipe.rating : 0);
        setIsSaved(isRecipeSaved ? true : false);
    }, [isRecipeSaved, ratingData]);

    if (recipeLoading || ratingLoading || recipeSavedLoading)
        return <AsyncDataLoaderWrapper loading text="loading recipe page..." />;
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

    function insertNewRating(newValue: number | null) {
        if (!!newValue && currentUser?.uid) {
            createRating({
                variables: {
                    user_id: currentUser?.uid,
                    recipe_index: Number(id),
                    rating: newValue,
                },
            }).then((rating) => console.log(rating.data));
        }
    }

    const setNewRating = (newValue: number | null) => {
        setRating(newValue);
        insertNewRating(newValue);
        notify(`You have given a rating of ${newValue} to the recipe ${recipe_title}`);
    };

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
                                    setNewRating(newValue);
                                }}
                                precision={0.5}
                            />
                            <span className="tag">{vote_count}</span>
                        </User>
                        <BookmarkButton
                            recipeID={Number(id)}
                            recipeName={recipe_title}
                            value={isSaved}
                            onChange={(value) => setIsSaved(value)}
                            size="large"
                        />
                    </div>
                    <RecipeImageCarousel images={[image, image]} />
                </div>
                <div className="comments">
                    {comments.map((comment, i) => (
                        <Comment {...comment} key={i} />
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
                    {_parseStringArray(ingredients).map((ingredient, i) => (
                        <li key={`${ingredient}-${i}`}>{ingredient}</li>
                    ))}
                </ul>
                <h5>How to cook?</h5>
                <ol>
                    {_parseStringArray(instructions).map((instruction, i) => (
                        <li key={`${instruction}-${i}`}>{instruction}</li>
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
                    .replaceAll(",/ ", "") +
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
