import React, { useEffect, useState } from "react";

import "./Users.scss";

const Users = () => {
  const [users, setusers] = useState("");
  const [allusers, setallusers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => {
        setallusers(result.user);

        setusers(result.user.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const monthlyusers = () => {
    var currentregisteredusers = 0;
    const currentmonth = new Date().getMonth() + 1;
    allusers.map((user) => {
      const date = user.createdAt;
      const month = date.split("-");
      const getmonth = month[1];
      if (currentmonth.toString() === getmonth) {
        console.log("yes");
        currentregisteredusers = currentregisteredusers + 1;
      }
    });

    return currentregisteredusers;
  };

  return (
    <div className="add-category  mycard">
      <div className="card auth-card">
        <h2>Total Registered</h2>
        <h2>{users}</h2>
      </div>
      <div className="card auth-card">
        <h2>Total Registered in month</h2>
        <h2>{monthlyusers()}</h2>
      </div>
    </div>
  );
};

export default Users;
