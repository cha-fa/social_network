import Cookies from "js-cookie";
import {
  registerFailure,
  registerSuccess,
  loginFailure,
  loginSuccess,
  logout,
  editProfile,
  retrieveUser,
} from "./authActions";

export const registerFetch = (userData) => {
  return (dispatch) => {
    const registerURL = "http://localhost:1337/auth/local/register";

    fetch(registerURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.jwt) {
          Cookies.set("token", response.jwt);
          dispatch(registerSuccess(response.user, response.jwt));
          console.log("register worked !");
        } else {
          dispatch(registerFailure(response.message[0].messages[0].message));
        }
      });
  };
};

export const loginFetch = (userData) => {
  return (dispatch) => {
    const loginURL = "http://localhost:1337/auth/local";

    fetch(loginURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.jwt) {
          Cookies.set("token", response.jwt);
          dispatch(loginSuccess(response.user, response.jwt));
          console.log("login worked !");
        } else {
          console.log("ERREUR", response.message[0].messages[0].message);
          dispatch(loginFailure(response.message[0].messages[0].message));
        }
      });
  };
};

export const fetchEditProfile = (userData) => {
  return (dispatch) => {
    const loginURL = "http://localhost:1337/users/me";

    fetch(loginURL, {
      method: "put",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(editProfile(response));
          console.log("edit worked !");
        }
      });
  };
};

export const userLogout = () => {
  return (dispatch) => {
    Cookies.remove("token");
    dispatch(logout());
    console.log("USER WAS LOGGED OUT");
  };
};

export const fetchRetrieveUser = (userID) => {
  return (dispatch) => {
    fetch(`http://localhost:1337/users/${userID}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(retrieveUser(response, Cookies.get("token")));
        }
      });
  };
};
