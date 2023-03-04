import {FC} from "react";
import {Routes, Route} from "react-router";
import {HomePage} from "../homePage/HomePage";
import {Navbar} from "./Navbar";
import SignIn from "../components/accounts/sign-in";
import SignUp from "../components/accounts/sign-up";
import RequireAuth from "../components/require-auth";
import Profile from "../components/accounts/profile";

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route path="signIn" element={<SignIn/>}/>
                <Route path="signUp" element={<SignUp/>}/>
                <Route path="profile" element={
                    <RequireAuth>
                        <Profile/>
                    </RequireAuth>}
                />
                <Route path="home" element={
                    <RequireAuth>
                        <HomePage/>
                    </RequireAuth>}/>
                <Route path="upload"/>
            </Route>
        </Routes>
    );
};