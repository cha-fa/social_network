import {
  fetchPostsError,
  fetchPostsRequest,
  fetchPostsSuccess,
  setPostsCount,
  addPostError,
  addPostSuccess,
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
