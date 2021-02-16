import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "redux/authentication/authMiddleware";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userLogout());
  };

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
        <li onClick={handleClick}>SE DECONNECTER</li>
      </ul>
    </div>
  );
};

export default Navbar;
