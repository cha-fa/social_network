import PostList from "components/PostList";
import NewPost from "pages/Home/components/NewPost";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "redux/posts/postsMiddleware";

const Home = ({ currentUser }) => {
  const [newPost, setNewPost] = useState();
  const handleNewPost = (post) => {
    setNewPost(post);
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    const interval = setInterval(() => {
      dispatch(fetchPosts());
      console.log("This will run every 60 second!");
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  return (
    <div className="Home">
      This is Home page
      <h2>Latest posts</h2>
      <NewPost currentUser={currentUser} handleNewPost={handleNewPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
