import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "redux/authentication/authMiddleware";

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const location = useLocation();

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
          <Link
            to={{
              pathname: "/login",
              previous: { location: location },
            }}
          >
            Auth
          </Link>
        </li>
        <li>
          <Link to="/register">Registration</Link>
        </li>
        {currentUser && (
          <li>
            <Link to={"/profile/me"}>Mon Profil</Link>
          </li>
        )}
        {currentUser && <li onClick={handleClick}>SE DECONNECTER</li>}
      </ul>
    </div>
  );
};

export default Navbar;
