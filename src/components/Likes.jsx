import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEditLikes } from "redux/posts/postsMiddleware";

const Likes = ({ post, currentUser }) => {
  const alreadyLiked =
    post.likedUsers.filter((user) => user.id === currentUser.id).length > 0
      ? true
      : false;

  const [liked, setLiked] = useState(alreadyLiked);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchEditLikes(!liked, post, currentUser));
    setLiked(!liked);
  };

  useEffect(() => {}, [post.likedUsers]);

  return (
    <div className="Likes">
      {currentUser && (
        <>
          <p>
            {post.like} {post.likedUsers.length}{" "}
            {(post.like > 1 && "likes") || "like"}
          </p>
          <p>
            STATE {liked ? "is liked" : "not liked"} users :{" "}
            {post.likedUsers.length}
          </p>
          <button type="button" onClick={handleClick}>
            {(liked && "UNLIKE") || "LIKE"}
          </button>
        </>
      )}
    </div>
  );
};

export default Likes;
