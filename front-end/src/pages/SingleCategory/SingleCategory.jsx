import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faXmark, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import categoryImg from "../../assets/category_bg.jpeg";
// Components
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import Pagination from "../../components/Pagination/Pagination";
// Pages
import Error404 from "../Error404/Error404";
// Style
import "./single-category.css";
// Implementation
const SingleCategory = () => {
  const { name } = useParams();
  const { categoryList } = useOutletContext();
  const domain =
    "https://themegamall.onrender.com/api/v1/category/page?limit=12&";
  const pageCategory = categoryList.find((category) => category.name === name);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [productList, setProductList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    setCurrentPage(1);
    setFilter("");
  }, [name]);

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

  useEffect(() => {
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `category=${name}&page=${currentPage}`;
    } else if (filter === "Price: Low to High") {
      fetchDomain = `category=${name}&page=${currentPage}&sort=price`;
    } else if (filter === "Price: High to Low") {
      fetchDomain = `category=${name}&page=${currentPage}&sort=-price`;
    }
    fetch(domain + fetchDomain)
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setProductList(json.data);
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, filter, name]);

  return (
    <>
      <Breadcrumbs
        crumbList={[
          { name: name, link: `/category/${pageCategory}` },
          { name: "Categories", link: "/categories" },
        ]}
      />
      {pageCategory ? (
        <>
          <div
            className="category-banner"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.25)), url(${categoryImg})`,
            }}
          >
            <FontAwesomeIcon icon={faTag} className="category-banner-icon" />
            {pageCategory.name}
          </div>
          <div className="home-section-banner">
            <div></div>
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
          <ProductShelf products={productList} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default SingleCategory;
