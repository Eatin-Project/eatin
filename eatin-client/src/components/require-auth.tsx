import {useAuth} from "../context/auth-context";
import {Navigate} from "react-router-dom";

function RequireAuth({children}: { children: JSX.Element }) {
    const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    }

    return <Navigate to="/signIn" />;
}

export default RequireAuth
