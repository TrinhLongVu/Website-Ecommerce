// Library
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
// Components
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
// Style
import "./search.css";
const Search = () => {
  const domain =
    "https://themegamall.onrender.com/api/v1/user/search/product?limit=8&";
  const { key } = useParams();

  const [productList, setProductList] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loadPage, setLoadPage] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      setLoadPage(true);
      prevFilterRef.current = filter;
    }
    if (prevPage.current !== currentPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Add smooth scrolling behavior
      });
      prevPage.current = currentPage;
    }
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `page=${currentPage}&search=${key}`;
    } else if (filter === "Price: Low to High") {
      fetchDomain = `page=${currentPage}&search=${key}&sort=price`;
    } else if (filter === "Price: High to Low") {
      fetchDomain = `page=${currentPage}&search=${key}&sort=-price`;
    }
    fetch(domain + fetchDomain)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "fail") {
          setEmpty(true);
        } else {
          setEmpty(false);
          setTotalPages(json.totalPage);
          setProductList(json.data);
        }
        setLoadPage(false);
      });
  }, [key, currentPage, filter]);

  return (
    <>
      <Breadcrumbs crumbList={[{ name: "Search", link: `/search/${key}` }]} />
      <div className="home-section-banner">
        <div className="srch--title">Search results for: "{key}"</div>
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
        <div className="srch--loader-container">
          <Loader />
        </div>
      ) : (
        <>
          {empty ? (
            <div className="no-res-msg-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="msg-icon" />
              <div>Looks like there are no articles fit with your search!</div>
              <div>Try using different keywords or check your spelling.</div>
            </div>
          ) : (
            <>
              {productList && <ProductShelf products={productList} />}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
