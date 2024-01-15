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
} from "@fortawesome/free-solid-svg-icons";
// Components
import CategorySlider from "../../../components/Home/CategorySlider/CategorySlider";
import ProductSlider from "../../../components/Home/ProductSlider/ProductSlider";
import ProductPanel from "../../../components/Home/ProductPanel/ProductPanel";
import ProductShelf from "../../../components/ProductShelf/ProductShelf";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import Filter from "../../../components/Filter/Filter";
// Style
import "./home.css";

const Home = () => {
  const { categoryList } = useOutletContext();
  const [bestSellerList, setBestSellerList] = useState([]);
  const [latestList, setLatestList] = useState([]);
  const domain = "http://localhost:8000/api/v1/product?";

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
  const filterList = ["Below $1000", "$1000 to $2000", "Above $2000"];
  const [filter, setFilter] = useState("");
  const prevFilterRef = useRef("all");
  const prevPage = useRef(1);

  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      setLoadPage(true);
      prevFilterRef.current = filter;
    }
    if (prevPage.current !== currentPage) {
      window.scrollTo({
        top: 1350,
        behavior: "smooth",
      });
      prevPage.current = currentPage;
    }
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `page=${currentPage}&limit=12`;
    } else if (filter === "Below $1000") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price&filter=0,1000`;
    } else if (filter === "$1000 to $2000") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price&filter=1000,2000`;
    } else if (filter === "Above $2000") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price&filter=2000,10000`;
    }
    fetch(domain + fetchDomain)
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setAllList(json.data);
        setLoadPage(false);
      });
  }, [currentPage, filter]);

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
          <Filter
            filterName={"Price"}
            filter={filter}
            filterList={filterList}
            setFilter={setFilter}
            setCurrentPage={setCurrentPage}
          />
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
