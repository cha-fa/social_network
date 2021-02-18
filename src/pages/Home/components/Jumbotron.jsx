import React from "react";
import { Link, useLocation } from "react-router-dom";

const Jumbotron = () => {
  const location = useLocation();
  const path = location.pathname;

  console.log(location);
  return (
    <div className="Jumbotron ">
      <div className="text-right">
        {path === "/register" &&
          ((
            <>
              <h2>WELCOME ON MY SOCIAL NETWORK</h2>
              <h4>
                {" "}
                This website is a training to Redux and React. <br />
                We use auth and routing to create a small social media website.
              </h4>
              <Link to="/register">JOIN US</Link>)
            </>
          ) || (
            <>
              ( <h2>WELCOME BACK</h2>
              <h4>We missed you !</h4>
            </>
          ))}
      </div>
    </div>
  );
};

export default Jumbotron;
