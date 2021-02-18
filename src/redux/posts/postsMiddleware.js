import {
  fetchPostsError,
  fetchPostsRequest,
  fetchPostsSuccess,
  setPostsCount,
  addPostError,
  addPostSuccess,
  editPost,
  deletePost,
} from "./postsActions";

import Cookies from "js-cookie";

export const fetchPosts = (userSlug) => {
  return (dispatch) => {
    let postsURL =
      "http://thp-strapi-social-network.herokuapp.com/posts?_sort=created_at:DESC";
    let countURL =
      "http://thp-strapi-social-network.herokuapp.com/posts/count?_sort=created_at:DESC";
    if (userSlug) {
      postsURL = `http://thp-strapi-social-network.herokuapp.com/posts?_sort=created_at:DESC&user.slug=${userSlug}`;
      countURL = `http://thp-strapi-social-network.herokuapp.com/posts/count?_sort=created_at:DESC&user.slug=${userSlug}`;
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
    const addURL = "http://thp-strapi-social-network.herokuapp.com/posts";
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
    fetch(`http://thp-strapi-social-network.herokuapp.com/posts/${postID}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(editPost(response));
        }
      });
  };
};

export const fetchDeletePost = (postID) => {
  return (dispatch) => {
    fetch(`http://thp-strapi-social-network.herokuapp.com/posts/${postID}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(deletePost(response));
        }
      });
  };
};

export const fetchEditLikes = (isLiked, post, user) => {
  return (dispatch) => {
    let newLikedUsers;
    if (isLiked) {
      newLikedUsers = [...post.likedUsers, user];
    } else {
      newLikedUsers = post.likedUsers.filter(
        (likedUser) => likedUser.id !== user.id
      );
    }

    const dataLike = {
      like: newLikedUsers.length,
      likedUsers: newLikedUsers,
    };

    fetch(`http://thp-strapi-social-network.herokuapp.com/posts/${post.id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLike),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(editPost(response));
        }
      });
  };
};
