import {User} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {signOutUser, userStateListener} from "../firebase/firebase";
import {createContext, ReactNode, useEffect, useState} from "react";

interface Props {
    children?: ReactNode
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user:User) => {},
    signOut: () => {}
});

export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        return userStateListener((user) => {
            if (user) {
                setCurrentUser(user)
            }
        })
    }, [setCurrentUser]);

    const signOut = () => {
        signOutUser()
        setCurrentUser(null)
        navigate('/')
    }

    const value = {
        currentUser,
        setCurrentUser,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
