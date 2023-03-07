import {useAuth} from "../../context/auth-context";
import {useGetUserByIdQuery} from "../../generated/graphql";

function Profile() {
    const {currentUser, signOutUser} = useAuth();
    const {data, error, loading} = useGetUserByIdQuery({variables: {id: !!currentUser?.uid ? currentUser?.uid : ""}});

    return (
        // Todo: Change this page in the future
        <div>
            <h3>email from graphql {data?.user.email}</h3>
            <h3>Welcome! {currentUser?.email}</h3>
            <p>Sign In Status: {currentUser && "active"}</p>
            <button onClick={signOutUser}>Sign Out</button>
        </div>
    );
}

export default Profile;
