import { useState, useRef } from "react";
import { fetchDeletePost, fetchEditPost } from "redux/posts/postsMiddleware";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Likes from "./Likes";
import DayJS from "react-dayjs";
import {
  AiOutlineCheckSquare,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

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
        <div>
          <Link to={"/users/" + post.user.slug}>@{post.user.username}</Link>
        </div>
      )}

      {(currentUser && currentUser.id === post.user.id && editing && (
        <input ref={newText} placeholder={text} defaultValue={text} />
      )) ||
        (currentUser && (
          <div className="PostCard_content">
            {<p>{text}</p>} <Likes currentUser={currentUser} post={post} />
          </div>
        )) || <p>{text}</p>}

      <div className="PostCard_footer">
        <DayJS format="MM/DD/YYYY à HH:MM">{post.created_at}</DayJS>

        {currentUser && post.user.id === currentUser.id && (
          <>
            {(!editing && (
              <span className="ml-3">
                <AiOutlineEdit size={30} onClick={handleClick} />
              </span>
            )) || (
              <span className="ml-3">
                <AiOutlineCheckSquare onClick={handleClick} size={30} />
              </span>
            )}

            <AiOutlineDelete
              className="ml-3"
              size={30}
              onClick={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
