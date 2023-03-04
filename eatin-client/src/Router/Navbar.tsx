import "./Navbar.css";

import { Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

import { AppLogo } from "./AppLogo";
import { useCallback } from "react";

export const Navbar = () => {
  const navigate = useNavigate();

  const goToHomePage = useCallback(() => navigate("/home"), [navigate]);

  return (
    <>
      <div className="navbar">
        <AppLogo onClick={goToHomePage} />
        <div className="navbar-end">
          <div className="user" onClick={() => navigate("/profile")}>
            <Avatar className="avatar" />
            <span>User name</span>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
