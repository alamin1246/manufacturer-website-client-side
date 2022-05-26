import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="d-flex justify-content-center align-items-center notfoundID">
        <div className="notfound ">
          <div className="notfound-404">
            <h1>404, Error</h1>
          </div>
          <h2>Oops! Page Is not Available</h2>
          <p>
            Sorry but the page you are looking for does not exist, have been
            removed.
          </p>
          <Link to="/">Go To Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
