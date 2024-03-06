import { useAuth0 } from "@auth0/auth0-react";

const LogInBtn = () => {
  const { loginWithRedirect} = useAuth0();
  return (
    <div className="login">
      <button onClick={() => loginWithRedirect()}>Sign in</button>
    </div>
  );
};
export default LogInBtn;
