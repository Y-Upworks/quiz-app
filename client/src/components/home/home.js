import React, { useContext } from "react";

import CategoryContext from "../../context/CategoryContext";

import "./home.scss";

const HomePage = () => {
  const categories = useContext(CategoryContext);

  return (
    <div className="home">
      {categories.categories.map((category) => {
        return (
          <div className="home__card" key={category._id}>
            {category.categoryname}
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
