import React from "react";
import "./Loader.scss";
export default function Loader() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
