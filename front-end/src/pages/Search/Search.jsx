import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ProductShelf from "../../components/ProductShelf/ProductShelf";
// Style
import "./search.css";
const Search = () => {
  const { key } = useParams();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("https://themegamall.onrender.com/api/v1/product/search/" + key)
      .then((res) => res.json())
      .then((json) => {
        setProductList(json.data);
      });
  }, [key]);
  return (
    <>
      {productList.length !== 0 ? (
        <>
          <div className="srch--title">Search results for: "{key}"</div>
          {productList && <ProductShelf products={productList} />}
        </>
      ) : (
        <>
          <div className="no-res-msg-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="msg-icon" />
            <div>Looks like there are no articles fit with your search!</div>
            <div>Try using different keywords or check your spelling.</div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
