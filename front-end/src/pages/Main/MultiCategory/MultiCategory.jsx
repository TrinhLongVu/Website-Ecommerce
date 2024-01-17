import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons";
// Components
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../../components/ProductShelf/ProductShelf";
import Loader from "../../../components/Loader/Loader";
// Styles
import "./multi-category.css";

const MultiCategory = () => {
  const { categoryList } = useOutletContext();
  const [loadPage, setLoadPage] = useState(false);
  const [categoriesProductList, setCategoriesProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadPage(true);
      try {
        const fetchPromises = categoryList.map(async (category) => {
          const response = await fetch(
            `http://localhost:8000/api/v1/category/page?page=1&limit=4&category=${category.name}`
          );
          const json = await response.json();
          return json.data;
        });
        const fetchedProductList = await Promise.all(fetchPromises);

        setCategoriesProductList(fetchedProductList);
        setLoadPage(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryList]);

  return (
    <>
      <Breadcrumbs crumbList={[{ name: "Categories", link: "/categories" }]} />
      {loadPage ? (
        <Loader />
      ) : (
        <>
          {categoryList.map((category, index) => (
            <div key={index} className="home-section">
              <div className="home-section-banner">
                <h2>
                  <FontAwesomeIcon icon={faTag} /> {category.name}
                </h2>
                <Link
                  to={`/categories/${category.name}`}
                  className="show-all-btn"
                >
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
      )}
    </>
  );
};

export default MultiCategory;
