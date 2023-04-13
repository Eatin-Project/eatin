import {signInWithEmailAndPassword, signOut, User} from "firebase/auth";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {auth} from "../firebase/firebase-config";

interface Props {
    children?: ReactNode;
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user: User) => {
    },
    signOutUser: () => {
    },
    signInUser: (email: string, password: string): any => {
    },
    signUpUser: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string,
        gender: string,
        birthDate: Date | null,
        country: string
    ): any => {
    },
});

export const AuthProvider = ({children}: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    function signInUser(email: string, password: string): any {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUpUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string,
        gender: string,
        birthDate: Date | null,
        country: string
    ) {
        return createUserWithEmailAndPassword(auth, email, password).then(
            (credential) => {
                return credential;
            }
        );
    }

    function signOutUser() {
        signOut(auth);
    }

    const value = {
        currentUser,
        setCurrentUser,
        signOutUser,
        signUpUser,
        signInUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
