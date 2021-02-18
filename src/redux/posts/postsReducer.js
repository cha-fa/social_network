import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SET_POSTS_COUNT,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  EDIT_POST,
  DELETE_POST,
  ADD_LIKE,
  REMOVE_LIKE,
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
    case EDIT_POST:
      return {
        ...state,
        currentPosts: state.currentPosts.map((post) =>
          post.id === action.post.id ? action.post : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        currentPosts: state.currentPosts.filter(
          (post) => post.id !== action.post.id
        ),
      };

    default:
      return state;
  }
};

export default postsReducer;
