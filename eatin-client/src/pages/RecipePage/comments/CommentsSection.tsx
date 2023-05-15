import "./CommentsSection.css";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";
import { useGetUserrecipesByRecipeIndexAndCommentQuery } from "../../../generated/graphql";
import { useInsertNewUserRecipe } from "../../../components/functions/useInsertNewUserRecipe";
import AsyncDataLoaderWrapper from "../../../components/ui/AsyncDataLoaderWrapper";

interface Props {
    recipeIndex: number;
}
export const CommentsSection: FC<Props> = ({ recipeIndex }) => {
    const [newCommentVal, setNewCommentVal] = useState<string>("");
    const [comments, setComments] = useState<any>([]);
    const { updateGivenComment } = useInsertNewUserRecipe(recipeIndex);
    const {
        data: recipeComments,
        loading: recipeCommentsLoading,
        refetch: refetchRecipeComments,
    } = useGetUserrecipesByRecipeIndexAndCommentQuery({
        variables: { recipeID: recipeIndex },
    });

    const keyPress = (e: any) => {
        // 13 is the keycode of Enter
        if (e.keyCode === 13) {
            addNewComment();
        }
    };

    useEffect(() => {
        setComments(recipeComments ? recipeComments.userRecipesByRecipeAndIsCommentExists : []);
    }, [recipeComments]);

    const addNewComment = async () => {
        console.log("lol", newCommentVal);
        updateGivenComment(newCommentVal);
        // refetchRecipeComments({ recipeID: recipeIndex });
        // const updatedComments = comments;
        console.log(comments);
    };

    return (
        <div className="comments-section">
            <h3 className="comments-section-title">Comments</h3>
            <div className="comments-section-content">
                <TextField
                    className="add-new-comment-text"
                    onChange={(e) => setNewCommentVal(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={addNewComment}>
                                    <CircleIcon className="enter-comment-btn" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        maxLength: 50,
                    }}
                    label="Add a new comment..."
                    variant="outlined"
                    onKeyDown={keyPress}
                />
                <Scrollable>
                    <div className="comments">
                        <AsyncDataLoaderWrapper
                            loading={recipeCommentsLoading}
                            text="loading comments..."
                        >
                            {recipeComments?.userRecipesByRecipeAndIsCommentExists.map(
                                (connection, i) => (
                                    <div key={i} className="specific-comment">
                                        <h6 className="specific-comment-user">
                                            {connection.user_id}
                                        </h6>
                                        <span className="specific-comment-content">
                                            {connection.given_comment}
                                        </span>
                                    </div>
                                ),
                            )}
                        </AsyncDataLoaderWrapper>
                    </div>
                </Scrollable>
            </div>
        </div>
    );
};

const Scrollable = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const comments = [
    { user: "shirley", content: "looks great!!" },
    { user: "shirley", content: "cooked this at home, it was amazing!" },
    { user: "shirley", content: "too much suger for me" },
    { user: "shirley", content: "super tasty" },
    { user: "shirley", content: "looks great!!!" },
    { user: "shirley", content: "looks great!!!" },
    { user: "shirley", content: "looks great!!!" },
    { user: "shirley", content: "looks great!!!" },
    { user: "shirley", content: "looks great!!!" },
    { user: "shirley", content: "looks great!!!" },
    {
        user: "shirley",
        content: `This cake is rich and wholesome at the same time. Once you have tasted it, you will want to make an extra one and save it for New Year's as well!`,
    },
];
