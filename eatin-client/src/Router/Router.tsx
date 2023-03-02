import { FC } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../homePage/HomePage";
import { UploadRecipePage } from "../uploadRecipe/UploadRecipePage";
import { Navbar } from "./Navbar";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="upload" element={<UploadRecipePage />} />
        </Route>
        <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
