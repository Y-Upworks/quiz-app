import React, { useEffect, useState } from "react";

import "./Users.scss";

const Users = () => {
  const [users, setusers] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => setusers(result.user.length))
      .catch((err) => {
        console.error(err);
      });
  });
  return (
    <div className="add-category  mycard">
      <div className="card auth-card">
        <h2>Total Registered</h2>
        <h2>{users}</h2>
      </div>
      <div className="card auth-card">
        <h2>Total Registered</h2>
        <h2>{users}</h2>
      </div>
    </div>
  );
};

export default Users;
