import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "redux/authentication/authMiddleware";

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const handleClick = () => {
    dispatch(userLogout());
    history.push("/");
  };

  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!currentUser && (
          <>
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
          </>
        )}

        {currentUser && (
          <li>
            <Link to={"/profile"}>Mon Profil</Link>
          </li>
        )}
        {currentUser && <li onClick={handleClick}>SE DECONNECTER</li>}
      </ul>
    </div>
  );
};

export default Navbar;
