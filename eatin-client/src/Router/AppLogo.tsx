import "./AppLogo.css";

import { FC } from "react";
import LocalDining from "@mui/icons-material/LocalDining";
import classNames from "classnames";

interface Props {
    hideTitle?: boolean;
    small?: boolean;
    className?: string;
    onClick?: () => void;
}

// TODO: create a new icon!!
export const AppLogo: FC<Props> = ({ hideTitle, small, className, onClick }) => {
    return (
        <div
            className={classNames("app-logo", className, { small, click: !!onClick })}
            onClick={onClick}
        >
            <LocalDining fontSize={small ? "medium" : "large"} />
            {!hideTitle ? <h3 className="app-logo-title">Eatin</h3> : null}
        </div>
    );
};
