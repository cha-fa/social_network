import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "redux/authentication/authMiddleware";

const Auth = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      identifier: identifier,
      password: password,
    };
    dispatch(loginFetch(userData));
  };

  console.log(loginInfo);

  return (
    <div className="Auth">
      <p>Page Authentification</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="identifier">Username or Email:</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div>
          <label for="password">Password (8 characters minimum):</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type="submit" value="Sign in"></input>
      </form>
      {loginInfo.error && <p> Erreur : {loginInfo.error}</p>}
    </div>
  );
};

export default Auth;
