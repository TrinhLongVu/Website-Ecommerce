import { Link } from "react-router-dom";
import "./product-panel.css";

const ProductPanel = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className="product-panel"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <div className="product-panel-info">
          <div className="product-panel-title">{product.title}</div>
          <div className="product-panel-desc">{product.detail}</div>
          <div className="product-panel-price">
            ${product.price?.toLocaleString()}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductPanel;
