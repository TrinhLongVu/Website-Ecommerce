import ProductFrame from "../../components/ProductFrame/ProductFrame";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Detail = () => {
  const product = {
    id: "123",
    name: "Celestial Glow Crystal Pendant dad add",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    desc: "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accessory for both casual and formal occasions.",
    price: "$89.99",
    time: "2 hours ago",
  };

  const productList = [product, product, product, product];
  return (
    <>
      <ProductFrame />
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTag} /> Related Products
          </h2>
          <Link to="/" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <ProductShelf products={productList} />
        </div>
      </div>
    </>
  );
};

export default Detail;
