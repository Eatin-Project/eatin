import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    NextOrObserver,
    User
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import {createUserWithEmailAndPassword} from "@firebase/auth";

const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);

export const signInUser = async (
    email: string,
    password: string
) => {
    if (!email && !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signUpUser = async (
    firstName: string, lastName: string, email: string, password: string, phone: string, gender: string, dateOfBirth: Date | null, country: String) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
        // Todo: create user in DB
        return credential;
    });
}

export const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
}

export const signOutUser = async () => await signOut(auth);
  