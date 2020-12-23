import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CategoryContext from "../../context/CategoryContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./home.scss";
import Footer from "../footer/footer";

const HomePage = () => {
  const history = useHistory();
  const categories = useContext(CategoryContext);

  const categoryClickHandler = (id) => {
    history.push(`/category/${id}`);
  };

  return (
    <>
      <div class="carousel-wrapper">
        <Carousel
          infiniteLoop
          useKeyboardArrows
          autoPlay
          axis="horizontal|vertical"
          showThumbs={true}
          showArrows={true}
        >
          <div>
            <img src="../../learn1.jpg" alt="carousel-one" />
          </div>
          <div>
            <img src="../../learn1.jpg" alt="carousel-two" />
          </div>
          <div>
            <img src="../../learn1.jpg" alt="carousel-three" />
          </div>
        </Carousel>
      </div>
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
