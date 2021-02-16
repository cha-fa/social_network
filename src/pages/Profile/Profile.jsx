import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import EditProfile from "./EditProfile";

const Profile = ({ currentUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(currentUser);

  const fetchUserProfile = () => {
    fetch(`http://localhost:1337/users/${userId}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setUser(response));
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  return (
    <div className="Profile">
      Page profile
      {user && (
        <ul>
          <li>username: {user.username}</li>
          <li>email: {user.email}</li>
          <li>description : {user.description}</li>
        </ul>
      )}
      {user.id === currentUser.id && <EditProfile />}
    </div>
  );
};

export default Profile;
