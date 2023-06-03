import { useMemo } from "react";
import { useAuth } from "../../context/auth-context";

export function useGetUsersName() {
    const { currentUser } = useAuth();
    const userID = useMemo(() => (currentUser ? currentUser.uid : ""), [currentUser]);
    return userID;
}
