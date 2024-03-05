import { useAuth0 } from "@auth0/auth0-react";

const LogInBtn = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div>
        <h1>Logga in här</h1>
        <button onClick={() => loginWithRedirect()}>Sign in</button>
      </div>
    )
  );
};
export default LogInBtn;
