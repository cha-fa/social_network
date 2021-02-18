import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEditLikes } from "redux/posts/postsMiddleware";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

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

  return (
    <span className="Likes">
      {currentUser && (
        <>
          {(liked && <AiFillHeart size={30} onClick={handleClick} />) || (
            <AiOutlineHeart size={30} onClick={handleClick} />
          )}{" "}
          {post.likedUsers.length}
        </>
      )}
    </span>
  );
};

export default Likes;
