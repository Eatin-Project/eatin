import "./User.css";

import { Avatar } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

interface Props {
    name: string;
    onClick?: () => void;
}

export const User: FC<PropsWithChildren<Props>> = ({ name, children, onClick }) => {
    return (
        <div className={classNames("eatin-user", { clickable: !!onClick })} onClick={onClick}>
            <Avatar className="avatar" />
            <span>{name}</span>
            {children}
        </div>
    );
};
