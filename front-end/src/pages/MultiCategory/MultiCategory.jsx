import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons";

import ProductShelf from "../../components/ProductShelf/ProductShelf";

import "./multi-category.css";

const MultiCategory = () => {
  //   const [categoriesProductList, setCategoriesProductList] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const fetchPromises = categoryList.map(async (category) => {
  //           const response = await fetch(
  //             `http://localhost:8000/api/v1/article/page/pagination?page=1&limit=4&category=${category.name.toLowerCase()}`
  //           );
  //           const json = await response.json();
  //           return json.data;
  //         });
  //         const fetchedArticleList = await Promise.all(fetchPromises);
  //         setCategoriesArticleList(fetchedArticleList);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const product = {
    id: "123",
    name: "Celestial Glow Crystal Pendant dad add",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    desc: "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accessory for both casual and formal occasions.",
    price: "$89.99",
    time: "2 hours ago",
  };

  const categoriesProductList = [
    [product, product, product, product],
    [product, product, product, product],
  ];

  return (
    <>
      {categoryList.map((category, index) => (
        <div key={index} className="home-section">
          <div className="home-section-banner">
            <h2>
              <FontAwesomeIcon icon={faTag} /> {category.name}
            </h2>
            <Link to={category.link} className="show-all-btn">
              Show all <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
          <div className="home-section-content">
            <div className="product-container">
              {categoriesProductList[index] && (
                <ProductShelf
                  key={index}
                  products={categoriesProductList[index]}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MultiCategory;
