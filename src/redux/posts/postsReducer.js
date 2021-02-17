import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SET_POSTS_COUNT,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
} from "./postsTypes";

const initialState = {
  loading: false,
  currentPosts: [],
  error: "",
  count: 0,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPosts: action.currentPosts,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_POSTS_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case ADD_POST_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        currentPosts: [...state.currentPosts, action.post],
      };
    default:
      return state;
  }
};

export default postsReducer;
