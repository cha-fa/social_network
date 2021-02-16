import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/authentication/authMiddleware";
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state);

  console.log(loginInfo);
  Cookies.get();
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Auth</Link>
        </li>
        <li>
          <Link to="/register">Registration</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li onClick={dispatch(logout())}>SE DECONNECTER</li>
      </ul>
    </div>
  );
};

export default Navbar;
