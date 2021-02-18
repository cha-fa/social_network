import Jumbotron from "pages/Home/components/Jumbotron";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerFetch } from "redux/authentication/authMiddleware";

const Registration = () => {
  const dispatch = useDispatch();
  const register = useSelector((state) => state);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    dispatch(registerFetch(userData));
  };

  return (
    <div className="Registration">
      <Jumbotron />

      <h2>Account Creation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username:</p>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>Email:</p>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign in"></input>
      </form>
      {register.error && <p> Erreur : {register.error}</p>}
    </div>
  );
};

export default Registration;
