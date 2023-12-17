import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faChevronRight,
  faDollarSign,
  faStar,
  faStore,
  faAngleDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import CategorySlider from "../../components/Home/CategorySlider/CategorySlider";
import ProductSlider from "../../components/Home/ProductSlider/ProductSlider";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./home.css";
import ProductPanel from "../../components/Home/ProductPanel/ProductPanel";
import ProductShelf from "../../components/ProductShelf/ProductShelf";

const Home = () => {
  const product = {
    id: "123",
    name: "Celestial Glow Crystal Pendant dad add",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    desc: "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accessory for both casual and formal occasions.",
    price: "$89.99",
    time: "2 hours ago",
  };

  const productList = [product, product, product];
  const productList2 = [
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
  ];
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      document.querySelector(".filter-box").style.borderRadius = "8px 8px 0 0";
    } else {
      document.querySelector(".filter-box").style.borderRadius = "8px";
    }
  };

  const filterList = ["Price: Low to High", "Price: High to Low"];

  const selectFilter = (filterType) => {
    setFilter(filterType);
    toggleFilter();
  };

  document.body.addEventListener("click", () => {
    if (!event.target.closest(".filter-box")) {
      setShowFilter(false);
      document.querySelector(".filter-box").style.borderRadius = "8px";
    }
  });

  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTags} /> Categories
          </h2>
          <Link to="/categories" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <CategorySlider />
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faDollarSign} /> Best Sellers
          </h2>
        </div>
        <div className="home-section-content">
          <ProductSlider />
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faStar} /> Latest Products
          </h2>
          <Link to="/" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <div className="product-container">
            {productList.map((product, index) => (
              <ProductPanel key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faStore} /> Our Products
          </h2>
          <div className="filter-box" onClick={toggleFilter}>
            {filter ? filter : "Filter"}
            {filter ? (
              <FontAwesomeIcon icon={faXmark} onClick={() => setFilter("")} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          {showFilter && (
            <div className="filter-dropdown">
              {filterList.map((item, index) => (
                <div key={index} onClick={() => selectFilter(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="home-section-content">
          <ProductShelf products={productList2} />
        </div>
      </div>
    </>
  );
};

export default Home;
