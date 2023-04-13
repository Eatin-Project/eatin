import "./AppLogo.css";

import { FC } from "react";
import { ReactComponent as Logo } from '../../assets/EatinLogo.svg';
import classNames from "classnames";

interface Props {
    small?: boolean;
    className?: string;
    onClick?: () => void;
}

export const AppLogo: FC<Props> = ({ small, className, onClick }) => {
    return (
        <div
            className={classNames("app-logo", className, { small, click: !!onClick })}
            onClick={onClick}
        >
            <Logo/>
        </div>
    );
};
