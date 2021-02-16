import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./authTypes";

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    error,
  };
};

export const registerSuccess = (user, token) => {
  return {
    type: REGISTER_SUCCESS,
    user,
    token,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const loginSuccess = (user, token) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    token,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
