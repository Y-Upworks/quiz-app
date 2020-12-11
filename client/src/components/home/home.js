import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CategoryContext from "../../context/CategoryContext";

import "./home.scss";

const HomePage = () => {
  const history = useHistory();
  const categories = useContext(CategoryContext);

  const categoryClickHandler = (id) => {
    history.push(`/category/${id}`);
  };

  return (
    <>
      <div className="pic"></div>
      <div className="home">
        {categories.categories &&
          categories.categories.map((category) => {
            return (
              <div
                className="home__card"
                key={category._id}
                onClick={() => {
                  categoryClickHandler(category._id);
                }}
              >
                {category.categoryname}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
