// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
// Styles
import "./product-frame.css";
import "react-toastify/dist/ReactToastify.css";
// Implementation
const ProductFrame = ({ product }) => {
  const addToCart = () => {
    if (product.isPreview === true) {
      return;
    }
    toast.success("Added 1 item to cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
          <div className="product-frame-desc">
            {Array.isArray(product.detail) ? (
              product.detail.map((para, index) => <div key={index}>{para}</div>)
            ) : (
              <div>{product.detail}</div>
            )}
          </div>
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
