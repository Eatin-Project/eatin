import "./CommentsSection.css";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";
import { useGetUserrecipesByRecipeIndexAndCommentQuery } from "../../../generated/graphql";
import { useInsertNewUserRecipe } from "../../../components/functions/useInsertNewUserRecipe";
import AsyncDataLoaderWrapper from "../../../components/ui/AsyncDataLoaderWrapper";
import { useGetUsersName } from "../../../components/hooks/useGetUsersName";

interface Props {
    recipeIndex: number;
}
export const CommentsSection: FC<Props> = ({ recipeIndex }) => {
    const [newCommentVal, setNewCommentVal] = useState<string>("");
    const [comments, setComments] = useState<{ userID: string; comment: string }[]>([]);
    const { updateGivenComment } = useInsertNewUserRecipe(recipeIndex);
    const userID = useGetUsersName();

    const { data: recipeComments, loading: recipeCommentsLoading } =
        useGetUserrecipesByRecipeIndexAndCommentQuery({
            variables: { recipeID: recipeIndex },
        });

    const keyPress = (e: any) => {
        // 13 is the keycode of Enter
        if (e.keyCode === 13) {
            addNewComment();
        }
    };

    useEffect(() => {
        const initialComments = recipeComments?.userRecipesByRecipeAndIsCommentExists.map(
            (item) => {
                return { userID: item.user_id, comment: item.given_comment };
            },
        );
        setComments(initialComments ? initialComments : []);
    }, [recipeComments, recipeIndex]);

    const addNewComment = async () => {
        updateGivenComment(newCommentVal);
        setNewCommentVal("");
        if (personalComment()) {
            const updatedComments = comments.map((item: { userID: string; comment: string }) => {
                const newComment = { ...item };
                if (item.userID === userID) {
                    newComment.comment = newCommentVal;
                }
                return newComment;
            });
            setComments([...updatedComments]);
        } else {
            const updatedComments = comments;
            updatedComments.push({ userID: userID, comment: newCommentVal });
            setComments([...updatedComments]);
        }
    };

    const personalComment = () => {
        return comments.find((item: { userID: string; comment: string }) => item.userID === userID);
    };

    return (
        <div className="comments-section">
            <h3 className="comments-section-title">Comments</h3>
            <div className="comments-section-content">
                <TextField
                    className="add-new-comment-text"
                    value={newCommentVal}
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
                {comments.length === 0 ? (
                    <h4 className="no-comments-text">No comment were posted on this recipe...</h4>
                ) : (
                    <div>
                        {personalComment() ? (
                            <div className="personal-comment">
                                <span>Your comment:</span>
                                <h5 className="personal-comment-content">
                                    {personalComment()?.comment}
                                </h5>
                            </div>
                        ) : (
                            ""
                        )}
                        <Scrollable>
                            <div className="comments">
                                <AsyncDataLoaderWrapper
                                    loading={recipeCommentsLoading}
                                    text="loading comments..."
                                >
                                    {comments.map((connection, i) => (
                                        <div key={i} className="specific-comment">
                                            <h6 className="specific-comment-user">
                                                {connection.userID}
                                            </h6>
                                            <span className="specific-comment-content">
                                                {connection.comment}
                                            </span>
                                        </div>
                                    ))}
                                </AsyncDataLoaderWrapper>
                            </div>
                        </Scrollable>
                    </div>
                )}
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
