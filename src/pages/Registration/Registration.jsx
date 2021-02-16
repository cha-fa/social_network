import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerFetch } from "redux/authentication/authMiddleware";

const Registration = () => {
  const dispatch = useDispatch();
  const register = useSelector((state) => state);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
      description: description,
    };
    dispatch(registerFetch(userData));
  };

  return (
    <div className="Registration">
      Page Registration
      <form onSubmit={handleSubmit}>
        <div>
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label for="email">Description:</label>
          <textarea
            type="text"
            rows="5"
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign in"></input>
      </form>
      {register.error && <p> Erreur : {register.error}</p>}
    </div>
  );
};

export default Registration;
