import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";

export const CommentsSection: FC = () => {
    const [newCommentVal, setNewCommentVal] = useState<string>("");

    const keyPress = (e: any) => {
        // 13 is the keycode of Enter
        if (e.keyCode === 13) {
            addNewComment();
        }
    };

    const addNewComment = () => {
        console.log("lol", newCommentVal);
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
                        {comments.map((comment, i) => (
                            <div key={i} className="specific-comment">
                                <h6 className="specific-comment-user">{comment.user}</h6>
                                <span className="specific-comment-content">{comment.content}</span>
                            </div>
                        ))}
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
