import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./product-slider.css";

import { Link } from "react-router-dom";

const ProductSlider = () => {
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
  const product = {
    name: "Celestial Glow Crystal Pendant",
    image: "https://example.com/images/products/shoes/red-high-heels.jpg",
    desc: "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accessory for both casual and formal occasions.",
    price: "$89.99",
    time: "2 hours ago",
  };

  const productList = [product, product, product, product, product];

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
            <h2>{product.name}</h2>
            <h4>{product.price}</h4>
            <h5>{product.time}</h5>
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
