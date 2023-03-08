import "./RecipePage.css";

import { Avatar } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../../generated/graphql";

export const RecipePage: FC = () => {
    const { id } = useParams();
    const recipe = useGetRecipeByIdQuery({ variables: { index: id || "" } }).data?.recipe;

    if (!id) return <h2>Recipe not found :(</h2>;

    const { author, image, recipe_title, ingredients, instructions, description } = recipe || {};
    return (
        <div className="recipe-page">
            <div className="right-side">
                <div className="recipe-media">
                    <div className="user">
                        <Avatar className="avatar" />
                        <span>{author}</span>
                    </div>
                    <img src={image} alt="recipe" />
                </div>
                <div className="comments">
                    {comments.map(({ content, user }) => (
                        <div className="comment-card" key={content}>
                            <div className="user">
                                <Avatar className="avatar" />
                                <span>{user}</span>
                            </div>
                            <p>{content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="recipe-data">
                <h4>{recipe_title}</h4>
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
    { user: "shirley", content: "looks great!!" },
    {
        user: "shirley",
        content: `This cake is rich and wholesome at the same time. Once you have tasted it, you will want to make an extra one and save it for New Year's as well!`,
    },
];
