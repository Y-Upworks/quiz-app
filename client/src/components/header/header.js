import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const history = useHistory();
  const logout = () => {
    window.localStorage.clear();
    // dispatch({ type: "CLEAR" });
    history.push("/login");
  };

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
          <li>
            <Link to="/signup" className="option">
              SIGNUP
            </Link>
          </li>
          <li
            key="b"
            style={{ color: "black", marginRight: "10px" }}
            onClick={() => {
              logout();
            }}
          >
            LOGOUT
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
