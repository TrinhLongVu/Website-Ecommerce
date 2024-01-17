import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./product-slider.css";

import { Link } from "react-router-dom";

const ProductSlider = ({ productList }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollLeft === 0) {
        sliderRef.current.scrollLeft = sliderRef.current.scrollWidth;
      } else {
        sliderRef.current.scrollBy({
          left: -sliderRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const maxScrollLeft =
        sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;

      if (sliderRef.current.scrollLeft === maxScrollLeft) {
        sliderRef.current.scrollLeft = 0;
      } else {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="product-slider-wrapper">
      <div className="product-slider" ref={sliderRef}>
        {productList.map((product, idx) => (
          <Link
            to={`/product/${product._id}`}
            key={idx}
            className="product-slider-item"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.25)), url(${product.image})`,
            }}
          >
            <h2>{product.title}</h2>
            <h4>${product.price?.toLocaleString()}</h4>
          </Link>
        ))}
        <div className="product-slider-btn slider-left" onClick={scrollLeft}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="product-slider-btn slider-right" onClick={scrollRight}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
