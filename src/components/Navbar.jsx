import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "redux/authentication/authMiddleware";

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userLogout());
  };

  console.log(
    "CURRENT USER IS",
    currentUser ? currentUser : "pas de current user"
  );

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
        {currentUser && (
          <li>
            <Link to={"/profile/me"}>Mon Profil</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/profile/13"}> Profil 13</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <Link to={"/profile/14"}> Profil 14</Link>
          </li>
        )}
        {currentUser && <li onClick={handleClick}>SE DECONNECTER</li>}
      </ul>
    </div>
  );
};

export default Navbar;
