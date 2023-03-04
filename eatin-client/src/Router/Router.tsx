import {FC} from "react";
import {Routes, Route} from "react-router";
import {HomePage} from "../homePage/HomePage";
import {Navbar} from "./Navbar";
import SignIn from "../components/accounts/sign-in";
import SignUp from "../components/accounts/sign-up";
import RequireAuth from "../components/require-auth";
import Profile from "../components/accounts/profile";
import {Navigate} from "react-router-dom";
// import WithoutNav from "./WithoutNav";
import WithNav from "./WithNav";

export const Router: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/signIn' replace/>}/>
            {/*<Route element={<WithoutNav/>}>*/}
                <Route path="signIn" element={<SignIn/>}/>
                <Route path="signUp" element={<SignUp/>}/>
            {/*</Route>*/}
            <Route element={<WithNav/>}>
                <Route path="profile" element={<RequireAuth><Profile/></RequireAuth>}/>
                <Route path="home" element={<RequireAuth><HomePage/></RequireAuth>}/>
                <Route path="upload"/>
            </Route>
        </Routes>
    );
};