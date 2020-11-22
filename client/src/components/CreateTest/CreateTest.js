import React, { useState, useEffect } from "react";

import "./CreateTest.scss";

const CreateTest = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/category", {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmEyYzk0MzJiZDE0NDA5MGVmY2Q1ZCIsImlhdCI6MTYwNjAzODU3MH0.2Kk0Pw7jt3o2kPMFzmMztL9vrU5ujJ9kSVShCHcSfB4`,
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((result) => setCategories(result.category))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="create-test">
      {categories.length > 0 && (
        <select name="category" id="category">
          {categories.map((category) => (
            <option value={category._id}>{category.categoryname}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CreateTest;
