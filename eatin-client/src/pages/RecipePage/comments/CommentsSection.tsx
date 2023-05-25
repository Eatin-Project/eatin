import "./CommentsSection.css";

import { Avatar, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import styled from "styled-components";
import AsyncDataLoaderWrapper from "../../../components/ui/AsyncDataLoaderWrapper";
import NavigationIcon from "@mui/icons-material/Navigation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { SearchFab } from "../../../components/ui/SearchBar";
import { useGetRecipesComments } from "../../../components/hooks/useGetRecipesComments";
import { useToastNotification } from "../../../components/functions/useToastNotification";
import { useGetUsersName } from "../../../components/hooks/useGetUsersName";

interface Props {
    recipeIndex: number;
}
export const CommentsSection: FC<Props> = ({ recipeIndex }) => {
    const [newCommentVal, setNewCommentVal] = useState<string>("");
    const { notify } = useToastNotification();
    const userID = useGetUsersName();

    let addCommentButton: HTMLButtonElement;
    let deleteCommentButton: HTMLButtonElement;
    let editCommentButton: HTMLButtonElement;

    const {
        addNewComment,
        currentComments,
        isLoading: recipeCommentsLoading,
    } = useGetRecipesComments(recipeIndex);

    const keyPress = (e: any) => {
        // 13 is the keycode of Enter
        if (e.keyCode === 13) {
            insertNewCommentToSection();
        }
    };

    const insertNewCommentToSection = async () => {
        addNewComment(newCommentVal);
        setNewCommentVal("");
        notify("A new comment was added!");
    };

    const getHowMuchTimeAgo = (date: Date) => {
        const seconds = Math.floor(((new Date() as any) - (date as any)) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval + " years ago";
        }

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + " months ago";
        }

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " days ago";
        }

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hours ago";
        }

        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minutes ago";
        }

        if (seconds < 10) return "just now";

        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="comments-section">
            <h4 className="comments-section-title">Comments</h4>
            <div className="comments-section-content">
                <div className="edit-section">
                    <Avatar
                        className="current-user-picture"
                        alt="Your picture"
                        src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg"
                    />
                    <TextField
                        className="add-new-comment-text"
                        value={newCommentVal}
                        onChange={(e) => setNewCommentVal(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchFab
                                        variant="extended"
                                        size="small"
                                        onClick={insertNewCommentToSection}
                                        color="primary"
                                        aria-label="search"
                                        ref={(node) => (!!node ? (addCommentButton = node) : "")}
                                    >
                                        <NavigationIcon className="enter-comment-btn" />
                                    </SearchFab>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            maxLength: 50,
                            style: {
                                height: "16px",
                            },
                        }}
                        label="Add a new comment..."
                        variant="outlined"
                        onKeyDown={keyPress}
                    />
                </div>

                {currentComments.length === 0 ? (
                    <h5 className="no-comments-text">No comment were posted on this recipe...</h5>
                ) : (
                    <div className="scrollable-comments">
                        <Scrollable>
                            <div className="comments">
                                <AsyncDataLoaderWrapper
                                    loading={recipeCommentsLoading}
                                    text="loading comments..."
                                >
                                    {currentComments.map((comment, i) => (
                                        <div key={i} className="specific-comment">
                                            <div className="full-comment-info">
                                                {comment.user_id === userID ? (
                                                    <div className="editing-comment">
                                                        <SearchFab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            aria-label="search"
                                                            className="edit-comment-btn"
                                                            ref={(node) =>
                                                                !!node
                                                                    ? (editCommentButton = node)
                                                                    : ""
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </SearchFab>
                                                        <SearchFab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            className="delete-comment-btn"
                                                            aria-label="search"
                                                            ref={(node) =>
                                                                !!node
                                                                    ? (deleteCommentButton = node)
                                                                    : ""
                                                            }
                                                        >
                                                            <DeleteOutlineIcon />
                                                        </SearchFab>
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}
                                                <div className="user-info-comment">
                                                    <Avatar
                                                        className="commenter-picture"
                                                        alt="Your picture"
                                                        src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg"
                                                    />
                                                    <div className="comment-info">
                                                        <span className="specific-comment-user">
                                                            {comment.user_first_name}{" "}
                                                            {comment.user_last_name}
                                                        </span>
                                                        <span>
                                                            {getHowMuchTimeAgo(
                                                                comment.comment_timestap,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="specific-comment-content">
                                                {comment.given_comment}
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
