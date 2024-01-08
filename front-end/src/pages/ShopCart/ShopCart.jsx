import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./shop-cart.css";
import {
  faCartPlus,
  faCashRegister,
  faCreditCard,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Toastify from "../../components/Toastify/Toastify";
import { useNavigate, useOutletContext } from "react-router-dom";

const ShopCart = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext();

  const removeFromCart = () => {};

  const credit = () => {
    const creditAmount = document.querySelector(
      ".balance-card-footer-input"
    ).value;
    if (creditAmount === "") {
      Toastify("error", "bottom-center", "Please enter credit amount!");
    } else if (isNaN(creditAmount)) {
      Toastify("error", "bottom-center", "Credit amount must be a number!");
    } else if (creditAmount <= 0) {
      Toastify("error", "bottom-center", "Credit amount must be positive!");
    } else {
      Toastify("success", "bottom-center", "Your credit has been added");
      document.querySelector(".balance-card-footer-input").value = "";
    }
  };

  return (
    <>
      <Breadcrumbs
        crumbList={[{ name: "Your Shopping Cart", link: "/cart" }]}
      />
      <div className="shop-cart">
        <div className="cart--order-table">
          {userInfo?.Cart.length === 0 ? (
            <div className="msg-box">
              <FontAwesomeIcon icon={faCartPlus} className="msg-icon" />
              <div>
                Looks like there is no item in your shopping cart yet!!!
              </div>
              <div>Would you like to put some in before checking out?</div>
            </div>
          ) : (
            <>
              {userInfo?.Cart.map((item, idx) => (
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
            </>
          )}
        </div>
        <div className="cart--order-checkout">
          <div className="cart--order-checkout-info">
            <div className="cart--order-checkout-info-title">Summary</div>
            <hr className="cart--order-checkout-info-hr" />
            <div className="cart--order-checkout-info-row">
              <div>Total Item(s) :</div>
              <div>{userInfo?.Cart.length}</div>
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
          <div className="balance-card">
            <div className="balance-card-info">
              <div className="balance-card-info-name">{userInfo?.FullName}</div>
              <div
                className="balance-card-info-avt"
                style={{ backgroundImage: `url(${userInfo?.Image_Avatar})` }}
              ></div>
            </div>
            <div className="balance-card-balance">$1863</div>
            <div className="balance-card-footer">
              <div className="balance-card-footer-logo">THE MEGA MALL</div>
              <input
                type="text"
                placeholder="$"
                className="balance-card-footer-input"
                onKeyDown={(e) => e.key === "Enter" && credit()}
              />
              <div className="balance-card-footer-credit" onClick={credit}>
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCart;
