import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <article className="column">
        {user?.picture && <img className="profile" src={user.picture} alt={user?.name} />}
      </article>
    )
  );
};
export default Profile;
