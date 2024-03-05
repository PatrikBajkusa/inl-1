import { useAuth0 } from "@auth0/auth0-react";

const LogOutBtn = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <h1>Logga ut</h1>
        <button onClick={() => logout()}>Sign Out</button>
      </div>
    )
  );
};
export default LogOutBtn;
