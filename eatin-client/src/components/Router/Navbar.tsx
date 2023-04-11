import "./Navbar.css";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { AppLogo } from "./AppLogo";
import { useCallback, useState } from "react";
import { useGetUserByIdQuery } from "../../generated/graphql";
import { useAuth } from "../../context/auth-context";
import { User } from "../ui/User";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Button, IconButton} from "@mui/material";
import {SearchBar} from "../ui/SearchBar";

export const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, signOutUser } = useAuth();
    const location = useLocation();
    const { data } = useGetUserByIdQuery({
        variables: { id: !!currentUser?.uid ? currentUser?.uid : "" },
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToHomePage = useCallback(() => navigate("/home"), [navigate]);
    const onLogOutClicked = () => {
        signOutUser();
        handleClose();
    };

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage} />
                <div className="navbar-end">
                    {location.pathname === "/home" && <SearchBar />}
                    <Button style={{ color: "black" }} onClick={() => navigate("/profile")}>
                        <User
                            name={!!data ? data?.user.firstname + " " + data?.user.lastname : ""}
                        />
                    </Button>
                    <div>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <ArrowDropDownIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <MenuItem onClick={onLogOutClicked}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};
