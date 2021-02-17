import { useState, useRef } from "react";
import { fetchDeletePost, fetchEditPost } from "redux/posts/postsMiddleware";

import { useDispatch, useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const newText = useRef();
  const [editing, setEditing] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [text, setText] = useState(post.text);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!editing) {
      setEditing(true);
    } else {
      dispatch(fetchEditPost(newText.current.value, post.id));
      setText(newText.current.value);
      setEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Es-tu sûr ? Cette action est irréversible")) {
      dispatch(fetchDeletePost(post.id));
    }
  };

  return (
    <div className="PostCard">
      <p>Auteur : {post.user.username}</p>
      {(!editing && <p>{text}</p>) || (
        <input ref={newText} placeholder={text} defaultValue={text} />
      )}
      <p>{post.like} likes</p>
      <p>Créé le {post.created_at}</p>
      {currentUser && post.user.id === currentUser.id && (
        <>
          <button type="button" onClick={handleClick}>
            EDIT
          </button>

          <button type="button" onClick={handleDelete}>
            DELETE
          </button>
        </>
      )}
    </div>
  );
};

export default PostCard;
