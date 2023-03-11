import "./Navbar.css";

import { Outlet, useNavigate } from "react-router-dom";

import { AppLogo } from "./AppLogo";
import { useCallback } from "react";
import { useGetUserByIdQuery } from "../../generated/graphql";
import { useAuth } from "../../context/auth-context";
import { User } from "../ui/User";

export const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { data } = useGetUserByIdQuery({
        variables: { id: !!currentUser?.uid ? currentUser?.uid : "" },
    });

    const goToHomePage = useCallback(() => navigate("/home"), [navigate]);

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage} />
                <div className="navbar-end">
                    <User
                        name={!!data ? data?.user.firstname + " " + data?.user.lastname : ""}
                        onClick={() => navigate("/profile")}
                    />
                </div>
            </div>
            <Outlet />
        </>
    );
};
