import PostList from "components/PostList";
import NewPost from "pages/Home/components/NewPost";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "redux/posts/postsMiddleware";
import Jumbotron from "./components/Jumbotron";

const Home = ({ currentUser }) => {
  const [newPost, setNewPost] = useState();
  const handleNewPost = (post) => {
    setNewPost(post);
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
    console.log("Ishould rerender");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  return (
    <div className="Home">
      {(currentUser && (
        <NewPost currentUser={currentUser} handleNewPost={handleNewPost} />
      )) || <Jumbotron />}
      <PostList posts={posts} newPost={newPost} />
    </div>
  );
};

export default Home;
