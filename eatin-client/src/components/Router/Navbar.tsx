import "./Navbar.css";
import { Outlet, useNavigate } from "react-router-dom";

import { AppLogo } from "./AppLogo";
import { useCallback, useState } from "react";
import { useGetUserByIdQuery } from "../../generated/graphql";
import { useAuth } from "../../context/auth-context";
import { User } from "../ui/User";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button, IconButton } from "@mui/material";
import { useGetUsersName } from "../hooks/useGetUsersName";

export const Navbar = () => {
    const navigate = useNavigate();
    const userID = useGetUsersName();
    const { signOutUser } = useAuth();
    const { data } = useGetUserByIdQuery({
        variables: { id: userID },
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
                    <Button
                        variant="outlined"
                        sx={{ color: "#EBEBEB", borderRadius: 35 }}
                        onClick={() => navigate("/profile")}
                    >
                        <User
                            name={!!data ? data?.user.firstname + " " + data?.user.lastname : ""}
                        />
                    </Button>
                    <div>
                        <IconButton
                            className="add-recipe"
                            size="small"
                            onClick={() => navigate("/upload")}
                        >
                            <NoteAddIcon />
                        </IconButton>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            sx={{ color: "#EBEBEB" }}
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
                            <MenuItem onClick={onLogOutClicked}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};
