import React from "react";

import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="title">Quiz App</div>
      <div className="options">
        <div className="option">HOME</div>
        <div className="option">ABOUT</div>
        <div className="option">SIGN IN</div>
        <div className="option">PROFILE</div>
        <div className="option">ADMIN</div>
      </div>
    </div>
  );
};

export default Header;
