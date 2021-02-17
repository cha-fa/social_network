import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEditLikes } from "redux/posts/postsMiddleware";

const Likes = ({ post, currentUser }) => {
  const storedPostsLiked = JSON.parse(
    localStorage.getItem("thp_social_network_likes")
  );

  const [postsLiked, setPostsLiked] = useState(storedPostsLiked || []);
  const [liked, setLiked] = useState(
    postsLiked.includes(post.id) ? true : false
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    setLiked(!liked);
    dispatch(fetchEditLikes(!liked, post.like, post.id));
    if (!liked) {
      setPostsLiked([...postsLiked, post.id]);
    } else {
      const newArray = postsLiked.filter((likedPost) => likedPost !== post.id);
      setPostsLiked(newArray);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "thp_social_network_likes",
      JSON.stringify(postsLiked)
    );
  }, [postsLiked]);

  return (
    <div className="Likes">
      {currentUser && (
        <>
          <p>POST ID : {post.id}</p>
          <p>{post.like} likes</p>
          <button type="button" onClick={handleClick}>
            {(liked && "UNLIKE") || "LIKE"}
          </button>
        </>
      )}
    </div>
  );
};

export default Likes;
