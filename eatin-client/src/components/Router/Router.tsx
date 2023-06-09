import { FC } from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

import { HomePage } from "../../pages/homePage/HomePage";
import { RecipePage } from "../../pages/RecipePage/RecipePage";
import { UploadRecipePage } from "../../pages/uploadRecipe/UploadRecipePage";
import SignIn from "../../pages/loginPage/sign-in";
import SignUp from "../../pages/loginPage/sign-up";
import RequireAuth from "../require-auth";
import { Profile } from "../accounts/profile";
import WithNav from "./WithNav";

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/signIn" replace />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route element={<WithNav />}>
                <Route
                    path="profile"
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />
                <Route
                    path="home"
                    element={
                        <RequireAuth>
                            <HomePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="recipe/:id"
                    element={
                        <RequireAuth>
                            <RecipePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="upload"
                    element={
                        <RequireAuth>
                            <UploadRecipePage />
                        </RequireAuth>
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
