import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "redux/posts/postsMiddleware";

const NewPost = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      text: text,
      user: currentUser.id,
    };
    dispatch(addPost(postData));
  };
  return (
    <div className="NewPost">
      NOUVEAU POST
      <form onSubmit={handleSubmit}>
        <div>
          <label for="text">Contenu:</label>
          <input
            type="text"
            id="text"
            name="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign in"></input>
      </form>
    </div>
  );
};

export default NewPost;
