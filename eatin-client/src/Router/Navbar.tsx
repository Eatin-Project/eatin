import "./Navbar.css";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

import { AppLogo } from "./AppLogo";
import { useCallback } from "react";

export const Navbar = () => {
  const navigate = useNavigate();

  const goToHomePage = useCallback(() => navigate("/"), [navigate]);

  return (
    <>
      <div className="navbar">
        <AppLogo onClick={goToHomePage} />
        <div className="navbar-end">
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
