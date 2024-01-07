import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./shop-cart.css";
import { faCashRegister, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useOutletContext } from "react-router-dom";

const ShopCart = () => {
  const { userInfo } = useOutletContext();
  const product = {
    name: "Iphone 13 Pro Max",
    category: "Electronics",
    price: 89.99,
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  };

  const [cart, setCart] = useState([product, product, product]);

  const removeFromCart = () => {};

  return (
    <>
      <Breadcrumbs
        crumbList={[{ name: "Your Shopping Cart", link: "/cart" }]}
      />
      <div className="shop-cart">
        <div className="cart--order-table">
          {cart.map((item, idx) => (
            <div key={idx} className="cart--item">
              <div
                className="cart--item-img"
                style={{
                  backgroundImage: `url("${item.img}")`,
                }}
              ></div>
              <div className="cart--item-info">
                <div className="cart--item-name">{item.name}</div>
                <div className="cart--item-category">{item.category}</div>
                <div className="cart--item-price">${item.price}</div>
              </div>
              <div className="cart--item-clear" onClick={removeFromCart}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          ))}
        </div>
        <div className="cart--order-checkout">
          <div className="cart--order-checkout-info">
            <div className="cart--order-checkout-info-title">Summary</div>
            <hr className="cart--order-checkout-info-hr" />
            <div className="cart--order-checkout-info-row">
              <div>Total Item(s) :</div>
              <div>3</div>
            </div>
            <div className="cart--order-checkout-info-row">
              <div>Total Price :</div>
              <div>$3</div>
            </div>
          </div>
          <div className="cart--order-checkout-btn">
            <FontAwesomeIcon icon={faCashRegister} id="cash-regis-icon" />
            CHECKOUT
          </div>
        </div>
      </div>
      <div className="balance">
        <h2 className="balance-title">Your Current Balance</h2>
        <div className="balance-content">
          <div className="balance-card">
            <div className="balance-card-info">
              <div className="balance-card-info-name">{userInfo.FullName}</div>
              <div
                className="balance-card-info-avt"
                style={{ backgroundImage: `url(${userInfo.Image_Avatar})` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCart;
