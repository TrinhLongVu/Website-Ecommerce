import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleDollar, faTag } from "@fortawesome/free-solid-svg-icons";
import categoryImg from "../../../assets/category_bg.jpeg";
// Components
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../../components/ProductShelf/ProductShelf";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import Filter from "../../../components/Filter/Filter";
// Style
import "./single-category.css";
// Implementation
const SingleCategory = () => {
  const domain = "http://localhost:8000/api/v1/category/page?limit=8&";
  const { name } = useParams();
  const prevNameRef = useRef("");
  const prevFilter = useRef("all");
  const { categoryList } = useOutletContext();
  const pageCategory = categoryList.find((category) => category.name === name);
  const [loadPage, setLoadPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    setCurrentPage(1);
    setFilter("");
  }, [name]);

  const filterList = ["Below $1000", "$1000 to $2000", "Above $2000"];

  useEffect(() => {
    if (prevNameRef.current !== name) {
      setLoadPage(true);
      setTotalPages(0);
      prevNameRef.current = name;
    }
    if (prevFilter.current !== filter) {
      setLoadPage(true);
      prevFilter.current = filter;
    }
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `category=${name}&page=${currentPage}`;
    } else if (filter === "Below $1000") {
      fetchDomain = `category=${name}&page=${currentPage}&sort=price&filter=0,1000`;
    } else if (filter === "$1000 to $2000") {
      fetchDomain = `category=${name}&page=${currentPage}&sort=price&filter=1000,2000`;
    } else if (filter === "Above $2000") {
      fetchDomain = `category=${name}&page=${currentPage}&sort=price&filter=2000,100000`;
    }
    fetch(domain + fetchDomain)
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setProductList(json.data);
        setLoadPage(false);
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
      <>
        <div
          className="category-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.25)), url(${categoryImg})`,
          }}
        >
          <FontAwesomeIcon icon={faTag} className="category-banner-icon" />
          {pageCategory?.name}
        </div>
        <div className="home-section-banner">
          <div></div>
          <Filter
            filterName={"Price"}
            filter={filter}
            filterList={filterList}
            setFilter={setFilter}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {loadPage ? (
          <div className="single-loader-container">
            <Loader />
          </div>
        ) : productList.length === 0 ? (
          <div className="no-res-msg-box">
            <FontAwesomeIcon icon={faFilterCircleDollar} className="msg-icon" />
            <div>
              Looks like there are no products fit with your filter criteria!
            </div>
            <div>Try using another filter for another range of price.</div>
          </div>
        ) : (
          <ProductShelf products={productList} />
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    </>
  );
};

export default SingleCategory;
