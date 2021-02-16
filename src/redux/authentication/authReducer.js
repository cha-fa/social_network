import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./authTypes";

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
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
    default:
      return state;
  }
};

export default authReducer;
