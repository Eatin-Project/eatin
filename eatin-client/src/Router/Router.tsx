import { FC } from "react";
import { Route, Routes } from "react-router";
import { HomePage } from "../homePage/HomePage";
import SignIn from "../components/accounts/sign-in";
import SignUp from "../components/accounts/sign-up";
import RequireAuth from "../components/require-auth";
import Profile from "../components/accounts/profile";
import { Navigate } from "react-router-dom";
import WithNav from "./WithNav";
import { RecipePage } from "../pages/RecipePage/RecipePage";

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
                <Route path="upload" />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};
