import { useAuth } from "../../context/auth-context";

function Profile() {
  const { currentUser, signOutUser } = useAuth();

  return (
    // Todo: Change this page in the future
    <div>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && "active"}</p>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
}

export default Profile;
