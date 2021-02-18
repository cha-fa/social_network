import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "redux/posts/postsMiddleware";
import { AiOutlineSend } from "react-icons/ai";
const NewPost = ({ currentUser, handleNewPost }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleClick = () => {
    const postData = {
      text: text,
      user: currentUser.id,
    };
    dispatch(addPost(postData));
    handleNewPost(postData);
  };

  return (
    <div className="NewPost">
      <form>
        <div className="d-flex align-content-center justify-content-center">
          <textarea
            type="text"
            id="text"
            name="text"
            placeholder="What's on your mind?"
            required
            rows="3"
            maxLength="280"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <AiOutlineSend
            className="ml-5 d-flex align-self-center"
            size={40}
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
};

export default NewPost;
