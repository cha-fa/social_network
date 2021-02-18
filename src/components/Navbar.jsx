import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "redux/authentication/authMiddleware";
import {
  RiKakaoTalkLine,
  RiLogoutCircleRLine,
  RiLoginCircleLine,
  RiUserHeartLine,
} from "react-icons/ri";
import { BiUserCircle, BiHomeHeart } from "react-icons/bi";
import "./navbar.scss";

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
      <RiKakaoTalkLine size={120} className="mb-3" />
      <ul>
        <div>
          <BiHomeHeart size={30} className="mr-2" />
          <Link to="/">Home</Link>
        </div>

        <div className="Authentication">
          {!currentUser && (
            <>
              <RiLoginCircleLine size={30} className="mr-2" />
              <Link
                to={{
                  pathname: "/login",
                  previous: { location: location },
                }}
              >
                Login
              </Link>
              <p>
                <span>
                  <RiUserHeartLine size={30} className="mr-2" />
                </span>
                <Link to="/register">Create an account</Link>
              </p>
            </>
          )}
          {currentUser && (
            <>
              <BiUserCircle size={30} className="mr-2" />
              <Link to={"/profile"}>@{currentUser.username}</Link>
              <p onClick={handleClick}>
                <span>
                  <RiLogoutCircleRLine className="mr-2" size={30} />
                </span>
                Log out
              </p>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
