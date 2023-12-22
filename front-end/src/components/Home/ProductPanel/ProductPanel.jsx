import { Link } from "react-router-dom";
import "./product-panel.css";

const ProductPanel = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="product-panel"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <div className="product-panel-info">
          <div className="product-panel-title">{product.name}</div>
          <div className="product-panel-desc">{product.desc}</div>
          <div className="product-panel-price">{product.price}</div>
        </div>
      </Link>
    </>
  );
};

export default ProductPanel;
