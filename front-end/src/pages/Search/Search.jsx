// Library
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// Components
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import Loader from "../../components/Loader/Loader";
// Style
import "./search.css";
const Search = () => {
  const { key } = useParams();

  const [productList, setProductList] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    setLoadPage(true);
    fetch(
      "http://localhost:8000/api/v1/user/search/product?page=1&limit=5&sort=-price&search=" +
        key
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.data.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
          setProductList(json.data);
        }
        setLoadPage(false);
      });
  }, [key]);
  return (
    <>
      <Breadcrumbs crumbList={[{ name: "Search", link: `/search/${key}` }]} />
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
              <div className="srch--title">Search results for: "{key}"</div>
              {productList && <ProductShelf products={productList} />}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
