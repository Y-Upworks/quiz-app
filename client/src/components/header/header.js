import React from "react";

import { Link } from "react-router-dom";

import "./header.scss";

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          Examly App
        </Link>
        <ul id="nav-mobile" className="right ">
          <li>
            <Link to="/" className="option">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" className="option">
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/login" className="option">
              SIGN IN
            </Link>
          </li>
          <li>
            <Link to="/profile" className="option">
              PROFILE
            </Link>
          </li>
          <li>
            <Link to="/admin" className="option">
              ADMIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
