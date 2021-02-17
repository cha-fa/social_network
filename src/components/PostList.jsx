import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "redux/posts/postsMiddleware";
import PostCard from "./PostCard";

const PostList = ({}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    const interval = setInterval(() => {
      dispatch(fetchPosts());
      console.log("This will run every 30 second!");
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="PostList">
      Liste des posts, nombre : {posts.count}
      <ul>
        {posts.currentPosts &&
          posts.currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </ul>
    </div>
  );
};

export default PostList;
