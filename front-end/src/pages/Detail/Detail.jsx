// Library
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import { faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons";
// Components
import ProductFrame from "../../components/ProductFrame/ProductFrame";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
// Implementation
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch("https://themegamall.onrender.com/api/v1/product/" + id)
      .then((res) => res.json())
      .then((json) => {
        const productDetail = json.data.detail.split("\n");
        json.data.detail = productDetail;
        setProduct(json.data);
        fetch(
          `https://themegamall.onrender.com/api/v1/category/page?page=1&limit=4&category=${json.data.category.name}`
        )
          .then((relatedRes) => relatedRes.json())
          .then((relatedJson) => {
            setRelatedProducts(relatedJson.data);
          });
      });
  }, [id]);

  return (
    <>
      <ProductFrame product={product} />
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTag} /> Related Products
          </h2>
          <Link
            to={"/categories/" + product.category?.name}
            className="show-all-btn"
          >
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <ProductShelf products={relatedProducts} />
        </div>
      </div>
    </>
  );
};

export default Detail;
