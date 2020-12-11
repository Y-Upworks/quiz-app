import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.scss";
import M from "materialize-css";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logout = () => {
    window.localStorage.clear();
    auth.logout();

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
              <i className="material-icons">home</i>
            </Link>
          </li>
          {/* <li>
            <Link to="/about" className="option">
              ABOUT
            </Link>
          </li> */}
          {!auth.user && (
            <li>
              <Link to="/login" className="option">
                SIGN IN
              </Link>
            </li>
          )}
          {auth.user && (
            <li>
              <Link to="/result" className="option">
                <i className="material-icons">account_circle</i>
              </Link>
            </li>
          )}
          {auth.user && (
            <li>
              <Link to="/admin" className="option">
                ADMIN
              </Link>
            </li>
          )}
          {!auth.user && (
            <li>
              <Link to="/signup" className="option">
                SIGNUP
              </Link>
            </li>
          )}
          {auth.user && (
            <li
              key="b"
              style={{ color: "black", marginRight: "10px", cursor: "pointer" }}
              onClick={() => {
                logout();
              }}
            >
              LOGOUT
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
