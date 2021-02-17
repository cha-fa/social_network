import PostCard from "./PostCard";

const PostList = ({ posts }) => {
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
