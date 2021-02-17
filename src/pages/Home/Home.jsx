import PostList from "components/PostList";
import NewPost from "pages/Home/components/NewPost";
import React from "react";

const Home = ({ currentUser }) => {
  return (
    <div className="Home">
      This is Home page
      <h2>Latest posts</h2>
      <NewPost currentUser={currentUser} />
      <PostList />
    </div>
  );
};

export default Home;
