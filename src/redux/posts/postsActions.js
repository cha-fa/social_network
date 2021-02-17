import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SET_POSTS_COUNT,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
} from "./postsTypes";

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (currentPosts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    currentPosts,
  };
};

export const fetchPostsError = (error) => {
  return {
    type: FETCH_POSTS_ERROR,
    error,
  };
};

export const setPostsCount = (count) => {
  return {
    type: SET_POSTS_COUNT,
    count,
  };
};

export const addPostSuccess = (post) => {
  return {
    type: ADD_POST_SUCCESS,
    post,
  };
};

export const addPostError = (error) => {
  return {
    type: ADD_POST_ERROR,
    error,
  };
};
