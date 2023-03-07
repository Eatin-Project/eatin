import "./Navbar.css";

import {Outlet, useNavigate} from "react-router-dom";
import {Avatar, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {AppLogo} from "./AppLogo";
import {useCallback} from "react";
import {useGetUserByIdQuery} from "../generated/graphql";
import {useAuth} from "../context/auth-context";

export const Navbar = () => {
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const {data} = useGetUserByIdQuery({variables: {id: !!currentUser?.uid ? currentUser?.uid : ""}});

    const goToHomePage = useCallback(() => navigate("/home"), [navigate]);

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage}/>
                <div className="navbar-end">
                  <IconButton
                    className="add-recipe"
                    size="small"
                    onClick={() => navigate("/upload")}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                    <div className="user" onClick={() => navigate("/profile")}>
                        <Avatar className="avatar"/>
                        <span>{!!data ? data?.user.firstname + " " + data?.user.lastname : ''}</span>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    );
};
