// Library
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
// Assets
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
// Components
import CategorySlider from "../../components/Home/CategorySlider/CategorySlider";
import ProductSlider from "../../components/Home/ProductSlider/ProductSlider";
import ProductPanel from "../../components/Home/ProductPanel/ProductPanel";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import Pagination from "../../components/Pagination/Pagination";
// Style
import "./home.css";

const Home = () => {
  const { categoryList } = useOutletContext();
  const [bestSellerList, setBestSellerList] = useState([]);
  const [latestList, setLatestList] = useState([]);
  useEffect(() => {
    fetch(
      "https://themegamall.onrender.com/api/v1/product?page=1&limit=5&sort=-sold"
    )
      .then((res) => res.json())
      .then((json) => {
        setBestSellerList(json.data);
      });
    fetch(
      "https://themegamall.onrender.com/api/v1/product?page=1&limit=3&sort=-posted_time"
    )
      .then((res) => res.json())
      .then((json) => {
        setLatestList(json.data);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allList, setAllList] = useState([]);
  useEffect(() => {
    fetch(
      `https://themegamall.onrender.com/api/v1/product?page=${currentPage}&limit=12`
    )
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setAllList(json.data);
      });
  }, [currentPage]);

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
    setCurrentPage(1);
    setFilter(filterType);
    toggleFilter();
  };

  document.body.addEventListener("click", () => {
    if (!event.target.closest(".filter-box")) {
      setShowFilter(false);
      document.querySelector(".filter-box").style.borderRadius = "8px";
    }
  });

  const unFilter = () => {
    setCurrentPage(1);
    setFilter("");
    toggleFilter();
  };

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
          <CategorySlider categoryList={categoryList} />
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faDollarSign} /> Best Sellers
          </h2>
        </div>
        <div className="home-section-content">
          <ProductSlider productList={bestSellerList} />
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
            {latestList.map((product, index) => (
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
        <div className="home-section-content">
          <ProductShelf products={allList} />
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Home;
