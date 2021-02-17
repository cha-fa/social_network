import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="PostCard">
      <p>{post.user.username}</p>
      <p>{post.text}</p>
      <p>{post.like}</p>
      <p>{post.created_at}</p>
    </div>
  );
};

export default PostCard;
