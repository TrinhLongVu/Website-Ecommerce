// Library
import { useState, useEffect, useRef } from "react";
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
import Loader from "../../components/Loader/Loader";
// Style
import "./home.css";

const Home = () => {
  const { categoryList } = useOutletContext();
  const [bestSellerList, setBestSellerList] = useState([]);
  const [latestList, setLatestList] = useState([]);
  const domain = "https://themegamall.onrender.com/api/v1/product?";

  useEffect(() => {
    fetch(domain + "page=1&limit=5&sort=-sold")
      .then((res) => res.json())
      .then((json) => {
        setBestSellerList(json.data);
      });
    fetch(domain + "page=1&limit=3&sort=-posted_time")
      .then((res) => res.json())
      .then((json) => {
        setLatestList(json.data);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allList, setAllList] = useState([]);

  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const prevFilterRef = useRef("all");
  const prevPage = useRef(1);
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

  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      setLoadPage(true);
      prevFilterRef.current = filter;
    }
    if (prevPage.current !== currentPage) {
      window.scrollTo({
        top: 1350,
        behavior: "smooth", // Add smooth scrolling behavior
      });
      prevPage.current = currentPage;
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
        setAllList(json.data);
        setLoadPage(false);
      });
  }, [currentPage, filter]);

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
        {loadPage ? (
          <div className="home-loader-container">
            <Loader />
          </div>
        ) : (
          <div className="home-section-content">
            <ProductShelf products={allList} />
          </div>
        )}
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
