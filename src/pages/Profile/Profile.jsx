import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchPosts } from "redux/posts/postsMiddleware";
import { useDispatch, useSelector } from "react-redux";
import PostList from "components/PostList";
import EditProfile from "./EditProfile";

const Profile = ({ currentUser }) => {
  const { userSlug } = useParams();
  const [user, setUser] = useState(currentUser);
  const [editing, setEditing] = useState(false);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const fetchUserProfile = () => {
    let url;
    if (!userSlug) {
      url = `http://localhost:1337/users/me`;
    } else {
      url = `http://localhost:1337/users?slug=${userSlug}`;
    }

    fetch(url, {
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
    dispatch(fetchPosts(userSlug ? userSlug : user.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSlug]);

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
      {user && user.id === currentUser.id && editing && <EditProfile />}
      {user && user.id === currentUser.id && !editing && (
        <button type="button" onClick={() => setEditing(!editing)}>
          EDITER
        </button>
      )}
      <PostList posts={posts} />
    </div>
  );
};

export default Profile;
