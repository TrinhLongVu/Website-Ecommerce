// Library
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// Components
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import Filter from "../../components/Filter/Filter";
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
  const [filter, setFilter] = useState("");
  const filterList = ["Below $1000", "$1000 to $2000", "Above $2000"];
  const prevFilterRef = useRef("all");
  const prevPage = useRef(1);

  useEffect(() => {
    setCurrentPage(1);
    setFilter("");
  }, [key]);

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      setLoadPage(true);
      prevFilterRef.current = filter;
    }
    if (prevPage.current !== currentPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      prevPage.current = currentPage;
    }
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `page=${currentPage}&search=${key}`;
    } else if (filter === "Below $1000") {
      fetchDomain = `page=${currentPage}&search=${key}&sort=price&filter=0,1000`;
    } else if (filter === "$1000 to $2000") {
      fetchDomain = `page=${currentPage}&search=${key}&sort=price&filter=1000,2000`;
    } else if (filter === "Above $2000") {
      fetchDomain = `page=${currentPage}&search=${key}&sort=price&filter=2000,100000`;
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
        <Filter
          filter={filter}
          filterList={filterList}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
        />
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
