import "./User.css";

import { Avatar } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

interface Props {
    name: string;
    size?: "small" | "large";
    onClick?: () => void;
}

export const User: FC<PropsWithChildren<Props>> = ({ name, children, size = "small", onClick }) => {
    return (
        <div className={classNames("eatin-user", size, { clickable: !!onClick })} onClick={onClick}>
            <Avatar className="avatar" />
            <span>{name}</span>
            {children}
        </div>
    );
};
