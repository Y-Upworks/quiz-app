import React, { useState } from "react";

import "./AddCategory.scss";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const addCategoryHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/category", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmEyYzk0MzJiZDE0NDA5MGVmY2Q1ZCIsImlhdCI6MTYwNjAzODU3MH0.2Kk0Pw7jt3o2kPMFzmMztL9vrU5ujJ9kSVShCHcSfB4`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        categoryname: category,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="add-category  mycard">
      <div className="card auth-card">
        <form onSubmit={(e) => addCategoryHandler(e)}>
          <h2>Add Category</h2>
          <input
            type="text"
            placeholder="Enter Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>

          <button
            disabled={!category}
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
