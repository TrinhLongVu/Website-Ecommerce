import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./product-frame.css";

const ProductFrame = ({ product }) => {
  const addToCart = () => {
    if (product.isPreview === true) {
      return;
    }
    console.log(1);
  };

  return (
    <>
      <div className="product-frame">
        <div
          className="product-frame-thumbnail"
          style={{
            backgroundImage: `url(${product.image})`,
          }}
        ></div>
        <div className="product-frame-info">
          <div className="product-frame-name">{product.title}</div>
          <div className="product-frame-price">${product.price}</div>
          <div className="product-frame-desc">{product.detail}</div>
          <div className="product-frame-btn-container">
            <div className="product-frame-btn" onClick={addToCart}>
              <FontAwesomeIcon icon={faCartPlus} /> ADD TO CART
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFrame;
