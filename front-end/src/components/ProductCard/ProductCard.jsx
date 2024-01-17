import "./product-card.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div
        className="product-card-thumbnail"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <div className="product-card-info">
        <div className="product-card-title">{product.title}</div>
        <div className="product-card-para">{product.detail}</div>
        <div className="product-card-price-row">
          <div className="product-card-price">
            ${product.price?.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
