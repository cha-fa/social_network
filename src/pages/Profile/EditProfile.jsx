import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProfile } from "redux/authentication/authMiddleware";
import { AiOutlineCheckSquare } from "react-icons/ai";

const EditProfile = () => {
  const loginInfo = useSelector((state) => state.auth);
  const currentUser = loginInfo.user;
  const [username, setUsername] = useState(currentUser.username);
  const [description, setDescription] = useState(currentUser.description);
  const dispatch = useDispatch();

  const handleClick = () => {
    const userData = {
      username: username,
      description: description,
    };
    dispatch(fetchEditProfile(userData));
  };

  return (
    <div className="EditProfile">
      <form>
        <div>
          <label for="username">Username:</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label for="description">Bio:</label>
          <textarea
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <AiOutlineCheckSquare size={30} onClick={handleClick} />
      </form>
      {loginInfo.error && <p> Erreur : {loginInfo.error}</p>}
    </div>
  );
};

export default EditProfile;
