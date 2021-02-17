import { useState, useRef } from "react";
import { fetchDeletePost, fetchEditPost } from "redux/posts/postsMiddleware";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Likes from "./Likes";
import DayJS from "react-dayjs";

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
      {currentUser && (
        <>
          <li>
            <Link to={"/users/" + post.user.slug}>{post.user.username}</Link>
          </li>
          <Likes currentUser={currentUser} post={post} />
        </>
      )}
      {(!editing && <p>{text}</p>) || (
        <input ref={newText} placeholder={text} defaultValue={text} />
      )}
      <p>
        <DayJS format="MM/DD/YYYY à HH:MM">{post.created_at}</DayJS>
      </p>

      {currentUser && post.user.id === currentUser.id && (
        <>
          <button type="button" onClick={handleClick}>
            {(!editing && "Modifier") || "Valider"}
          </button>

          <button type="button" onClick={handleDelete}>
            Supprimer
          </button>
        </>
      )}
    </div>
  );
};

export default PostCard;
