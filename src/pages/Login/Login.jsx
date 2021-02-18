import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "redux/authentication/authMiddleware";
import { useHistory } from "react-router-dom";
import Jumbotron from "pages/Home/components/Jumbotron";

const Login = ({ location }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.auth);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      identifier: identifier,
      password: password,
    };
    dispatch(loginFetch(userData));
  };

  useEffect(() => {
    if (loginInfo.user) {
      const path = location.previous
        ? location.previous.location.pathname
        : "/";
      history.push(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo]);

  return (
    <div className="Login">
      <Jumbotron />

      <form onSubmit={handleSubmit}>
        <div>
          <p>Username or Email:</p>
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
          <p>Password:</p>
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

export default Login;
