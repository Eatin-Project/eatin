import "./User.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
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
            <PersonOutlineOutlinedIcon className="avatar" sx={{ backgroundColor: "transparent", fontSize: "small" }} />
            <span>{name}</span>
            {children}
        </div>
    );
};
