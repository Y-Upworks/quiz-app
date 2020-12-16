import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CategoryContext from "../../context/CategoryContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./home.scss";

const HomePage = () => {
  const history = useHistory();
  const categories = useContext(CategoryContext);

  const categoryClickHandler = (id) => {
    history.push(`/category/${id}`);
  };

  return (
    <>
      {/* <div className="pic"></div> */}
      {/* <div class="carousel-wrapper">
        <Carousel infiniteLoop useKeyboardArrows autoPlay>
          <div className="slider">
            <img className="slider" src="../../learn1.jpg" />
          </div>
          <div>
            <img className="slider" src="../../learn2.jpg" />
          </div>
          <div>
            <img className="slider" src="../../learn3.jpg" />
          </div>
        </Carousel>
      </div> */}
      <Carousel
        axis="horizontal|vertical"
        showThumbs={true | false}
        showArrows={true | false}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        <div>
          <img src="../../learn1.jpg" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="../../learn1.jpg" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="../../learn1.jpg" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
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
