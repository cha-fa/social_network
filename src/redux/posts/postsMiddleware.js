import {
  fetchPostsError,
  fetchPostsRequest,
  fetchPostsSuccess,
  setPostsCount,
  addPostError,
  addPostSuccess,
  editPost,
  deletePost,
  addLike,
  removeLike,
} from "./postsActions";

import Cookies from "js-cookie";

export const fetchPosts = (userID) => {
  return (dispatch) => {
    let postsURL = "http://localhost:1337/posts?_sort=created_at:DESC";
    let countURL = "http://localhost:1337/posts/count?_sort=created_at:DESC";
    if (userID) {
      postsURL = `http://localhost:1337/posts?_sort=created_at:DESC&user.id=${userID}`;
      countURL = `http://localhost:1337/posts/count?_sort=created_at:DESC&user.id=${userID}`;
    }

    dispatch(fetchPostsRequest());

    fetch(countURL)
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(setPostsCount(response));
        }
      });

    fetch(postsURL)
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(fetchPostsSuccess(response));
        } else {
          dispatch(fetchPostsError(response.error));
        }
      });
  };
};

export const addPost = (postData) => {
  return (dispatch) => {
    const addURL = "http://localhost:1337/posts";
    fetch(addURL, {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(addPostSuccess(response));
        } else {
          dispatch(addPostError(response.message[0].messages[0].message));
        }
      });
  };
};

export const fetchEditPost = (text, postID) => {
  return (dispatch) => {
    fetch(`http://localhost:1337/posts/${postID}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("EDITING RESPONSE", response);
        if (response) {
          dispatch(editPost(response));
        }
      });
  };
};

export const fetchDeletePost = (postID) => {
  return (dispatch) => {
    fetch(`http://localhost:1337/posts/${postID}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("DELETE RESPONSE", response);
        if (response) {
          dispatch(deletePost(response));
        }
      });
  };
};

export const fetchEditLikes = (isLiked, currentLikes, postID) => {
  return (dispatch) => {
    let like;
    console.log("BASE LIKE", currentLikes, "IS LIKED", isLiked);
    if (isLiked) {
      like = { like: currentLikes + 1 };
    } else {
      like = { like: currentLikes - 1 };
    }
    fetch(`http://localhost:1337/posts/${postID}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response && isLiked) {
          console.log("RESPONSE IN LIKED", response);
          dispatch(addLike(response));
        } else if (response) {
          dispatch(removeLike(response));
        }
      });
  };
};
