import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./product-frame.css";

const ProductFrame = () => {
  const product = {
    id: "123",
    name: "Celestial Glow Crystal Pendant dad add dnajwn nadwjnd",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    desc: "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accesso.",
    price: "$89.99",
    time: "2 hours ago",
  };
  return (
    <>
      <div className="product-frame">
        <div
          className="product-frame-thumbnail"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
          }}
        ></div>
        <div className="product-frame-info">
          <div className="product-frame-name">{product.name}</div>
          <div className="product-frame-price">{product.price}</div>
          <div className="product-frame-desc">{product.desc}</div>
          <div className="product-frame-btn-container">
            <div className="product-frame-btn">
              <FontAwesomeIcon icon={faCartPlus} /> ADD TO CART
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFrame;
