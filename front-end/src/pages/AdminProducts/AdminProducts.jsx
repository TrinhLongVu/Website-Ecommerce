import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUp,
  faCircleXmark,
  faAngleDown,
  faStore,
  faTags,
  faCirclePlus,
  faEyeSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import Toastify from "../../components/Toastify/Toastify";

import { Link, useOutletContext } from "react-router-dom";

import "./admin-products.css";

const AdminProducts = () => {
  const domain = "https://themegamall.onrender.com/api/v1/product?";
  const { categoryList } = useOutletContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [productList, setProductList] = useState([]);

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [loadPage, setLoadPage] = useState(false);
  const [del, setDel] = useState(false);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      document.querySelector(".home-filter-box").style.borderRadius =
        "8px 8px 0 0";
    } else {
      document.querySelector(".home-filter-box").style.borderRadius = "8px";
    }
  };

  const filterList = ["Price: Low to High", "Price: High to Low"];
  const selectFilter = (filterType) => {
    setCurrentPage(1);
    setFilter(filterType);
    toggleFilter();
  };

  const prevFilterRef = useRef("all");
  const prevPage = useRef(1);

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      setLoadPage(true);
      prevFilterRef.current = filter;
    }
    if (prevPage.current !== currentPage) {
      window.scrollTo({
        top: 380,
        behavior: "smooth",
      });
    }
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `page=${currentPage}&limit=12`;
    } else if (filter === "Price: Low to High") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price`;
    } else if (filter === "Price: High to Low") {
      fetchDomain = `page=${currentPage}&limit=12&sort=-price`;
    }
    fetch(domain + fetchDomain)
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setProductList(json.data);
        setLoadPage(false);
      });
  }, [currentPage, filter, del]);

  document.body.addEventListener("click", (event) => {
    const homeFilterBox = document.querySelector(".home-filter-box");
    if (homeFilterBox && !event.target.closest(".home-filter-box")) {
      setShowFilter(false);
      homeFilterBox.style.borderRadius = "8px";
    }
  });

  const unFilter = () => {
    setCurrentPage(1);
    setFilter("");
    toggleFilter();
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:8000/api/v1/product/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          Toastify(
            "success",
            "bottom-right",
            "Successfully removed that product from the store"
          );
          if (productList.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          setDel(!del);
        } else {
          Toastify(
            "error",
            "bottom-right",
            "Failed to remove that product from the store!!! Please try again"
          );
        }
      });
  };
  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTags} /> Categories
          </h2>
        </div>
        <div className="home-section-content">
          <div className="categories-list">
            {categoryList.map((category, idx) => (
              <div
                key={idx}
                className="category-card"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="category-card-bg"></div>
                <h3 className="category-card-name">
                  {hoveredIndex === idx ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    category.name
                  )}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner" id="add-category-banner">
          <h2>
            <FontAwesomeIcon icon={faCirclePlus} /> Add Category
          </h2>
          <div className="add-category-box">
            <input type="text" id="add-category" placeholder="Category Name" />
            <button id="add-category-btn">
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faStore} /> Products
          </h2>
          <div className="home-filter-box" onClick={toggleFilter}>
            {filter ? filter : "Filter"}
            {filter ? (
              <FontAwesomeIcon icon={faXmark} onClick={unFilter} />
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
        <div className="admin-products">
          {loadPage ? (
            <div className="admin-products-loader-container">
              <Loader />
            </div>
          ) : (
            <>
              {productList.map((product, index) => (
                <div key={index} className="admin-products-card">
                  <div
                    className="admin-products-card-img"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <div className="admin-products-card-name">
                    {product.title}
                  </div>
                  <div className="admin-products-card-price">
                    ${product.price}
                  </div>
                  <div className="admin-products-card-btn-container">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="admin-products-card-btn"
                      id="admin-products-card-update"
                    >
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className="admin-products-card-btn-icon"
                      />
                    </Link>
                    <div
                      className="admin-products-card-btn"
                      id="admin-products-card-delete"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="admin-products-card-btn-icon"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
