import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProfile } from "redux/authentication/authMiddleware";
import slugify from "slugify";

const EditProfile = () => {
  const loginInfo = useSelector((state) => state.auth);
  const currentUser = loginInfo.user;
  const [username, setUsername] = useState(currentUser.username);
  const [description, setDescription] = useState(currentUser.description);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      description: description,
      slug: slugify(username),
    };
    dispatch(fetchEditProfile(userData));
  };

  console.log(loginInfo);
  return (
    <div className="EditProfile">
      Modifier mon profil :
      <form onSubmit={handleSubmit}>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label for="description">description :</label>
          <textarea
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <input type="submit" value="Valider les changements"></input>
      </form>
      {loginInfo.error && <p> Erreur : {loginInfo.error}</p>}
    </div>
  );
};

export default EditProfile;
