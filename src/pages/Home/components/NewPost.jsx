import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "redux/posts/postsMiddleware";

const NewPost = ({ currentUser, handleNewPost }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      text: text,
      user: currentUser.id,
    };
    dispatch(addPost(postData));
    handleNewPost(postData);
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
        <input type="submit" value="Publish"></input>
      </form>
    </div>
  );
};

export default NewPost;
