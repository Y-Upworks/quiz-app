import React, { useContext } from "react";
import CategoryContext from "../../context/CategoryContext";

import "./home.scss";

const HomePage = (props) => {
  const categories = useContext(CategoryContext);

  const categoryClickHandler = (id) => {
    const selectCategory = categories.categories.find(
      (category) => category._id === id
    );

    categories.setCategory(selectCategory);

    props.history.push("/instructions");
  };

  return (
    <>
      <div className="pic"></div>
      <div className="home">
        {categories.categories.map((category) => {
          return (
            <>
              <div
                className="home__card"
                key={category._id}
                onClick={() => {
                  categoryClickHandler(category._id);
                }}
              >
                {category.categoryname}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
