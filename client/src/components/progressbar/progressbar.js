import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Progressbar = (props) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: "45%" }}>{props.children}</div>
      </div>
    </div>
  );
};

export default Progressbar;
