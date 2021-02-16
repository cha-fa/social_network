import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      Navbar
      <Link to="/">Home</Link>
      <Link to="/login">Auth</Link>
      <Link to="/register">Registration</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Navbar;
