import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchPosts } from "redux/posts/postsMiddleware";
import { useDispatch, useSelector } from "react-redux";
import PostList from "components/PostList";
import EditProfile from "./EditProfile";
import { BiUserCircle } from "react-icons/bi";
const Profile = ({ currentUser }) => {
  const { userSlug } = useParams();
  const [user, setUser] = useState(currentUser);
  const [editing, setEditing] = useState(false);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const fetchUserProfile = () => {
    let url;
    if (!userSlug) {
      url = `http://thp-strapi-social-network.herokuapp.com/users/me`;
    } else {
      url = `http://thp-strapi-social-network.herokuapp.com/users?slug=${userSlug}`;
    }

    fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setUser(response[0]));
  };

  useEffect(() => {
    fetchUserProfile();
    dispatch(fetchPosts(userSlug ? userSlug : user.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSlug]);

  return (
    <div className="Profile">
      <h4>
        <BiUserCircle size={50} className="mr-2" />
        {user.username}
      </h4>
      {user && (
        <ul>
          <h5>Email:</h5>
          <p>{user.email}</p>
          {user.description && (
            <>
              <h5>Bio: </h5>
              <p>{user.description}</p>
            </>
          )}
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
