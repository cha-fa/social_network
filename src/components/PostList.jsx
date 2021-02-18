import PostCard from "./PostCard";
import { useEffect } from "react";
const PostList = ({ posts, newPost }) => {
  console.log("post");

  useEffect(() => {
    console.log("new post");
  }, [posts, newPost]);

  return (
    <div className="PostList">
      <div className="d-flex justify-content-end mr-2">
        <p>{posts.count} posts</p>
      </div>
      <div className="d-flex justify-content-center">
        <ul className="m-0 p-0">
          {posts.currentPosts &&
            posts.currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;
