import { useOutletContext } from "react-router-dom";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
// Components
import Toastify from "../Toastify/Toastify";
// Styles
import "./product-frame.css";
// Implementation
const ProductFrame = ({ product }) => {
  const { userInfo, userChange, changeUser } = useOutletContext();
  const addToCart = () => {
    if (product.isPreview === true) {
      return;
    }
    if (!userInfo) {
      Toastify("error", "top-right", "Please login to add product to cart");
      return;
    }
    fetch("http://localhost:8000/api/v1/cart/add/" + userInfo._id, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        product_id: product._id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          Toastify("success", "top-right", "Added 1 item to your cart");
          changeUser(!userChange);
        } else if (json.status === "fail") {
          Toastify("error", "top-right", "Something's wrong. Please try again");
        } else {
          Toastify(
            "error",
            "top-right",
            "There's some error!!! Please try again later"
          );
        }
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
          <div className="product-frame-price">
            ${product.price?.toLocaleString()}
          </div>
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
