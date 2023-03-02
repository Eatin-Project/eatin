import "./Navbar.css";

import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { AppLogo } from "./AppLogo";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <AppLogo onClick={() => navigate("/")} />
        <div className="navbar-end">
          <IconButton
            className="add-recipe"
            size="small"
            onClick={() => navigate("/upload")}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <div className="user">
            <Avatar className="avatar" />
            <span>User name</span>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
