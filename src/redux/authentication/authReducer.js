import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  EDIT_PROFILE,
} from "./authTypes";

let userObj = JSON.parse(localStorage.getItem("thp_social_network_user_obj"));
const initialUser = userObj ? userObj.user : null;

const initialState = {
  token: null,
  user: initialUser,
  isLoggedIn: initialUser ? true : false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoggedIn: true,
        error: "",
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        token: null,
        user: null,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        user: null,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: action.user,
        token: action.token,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default authReducer;
