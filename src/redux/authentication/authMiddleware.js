import Cookies from "js-cookie";
import {
  registerFailure,
  registerSuccess,
  loginFailure,
  loginSuccess,
  logout,
  editProfile,
} from "./authActions";

export const registerFetch = (userData) => {
  return (dispatch) => {
    const registerURL =
      "http://thp-strapi-social-network.herokuapp.com/auth/local/register";

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
          localStorage.setItem(
            "thp_social_network_user_obj",
            JSON.stringify(response)
          );
        } else {
          dispatch(registerFailure(response.message[0].messages[0].message));
        }
      });
  };
};

export const loginFetch = (userData) => {
  return (dispatch) => {
    const loginURL =
      "http://thp-strapi-social-network.herokuapp.com/auth/local";

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
          localStorage.setItem(
            "thp_social_network_user_obj",
            JSON.stringify(response)
          );
        } else {
          dispatch(loginFailure(response.message[0].messages[0].message));
        }
      });
  };
};

export const fetchEditProfile = (userData) => {
  return (dispatch) => {
    const loginURL = "http://thp-strapi-social-network.herokuapp.com/users/me";

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
