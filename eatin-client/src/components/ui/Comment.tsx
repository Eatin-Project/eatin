import { FC } from "react";
import { User } from "./User";

interface Props {
    content: string;
    user: string;
}

export const Comment: FC<Props> = ({ content, user }) => {
    return (
        <div className="comment-card" key={content}>
            <User name={user} />
            <p>{content}</p>
        </div>
    );
};
