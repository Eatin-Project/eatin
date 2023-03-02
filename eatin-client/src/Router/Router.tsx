import { FC } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../homePage/HomePage";
import { Navbar } from "./Navbar";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="upload" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
