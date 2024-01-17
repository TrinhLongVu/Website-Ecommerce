import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCashRegister,
  faCreditCard,
  faMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Toastify from "../../../components/Toastify/Toastify";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

import "./shop-cart.css";
const ShopCart = () => {
  const { userInfo, userChange, changeUser } = useOutletContext();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loadCheckout, setLoadCheckout] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/cart/get/" + userInfo?._id, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTotalPrice(json.data.totalPrice);
        setCart(json.data.cart);
      });
    fetch("http://localhost:8000/api/v1/payment/get/" + userInfo?._id, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setBalance(json.data.UserBalance);
      });
  }, [userInfo]);

  const removeFromCart = (id) => {
    fetch("http://localhost:8000/api/v1/cart/minus/" + userInfo?._id, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        product_id: id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          changeUser(!userChange);
          Toastify("success", "top-right", "Removed an item from cart");
        } else {
          Toastify("error", "top-right", "Something went wrong");
        }
      });
  };

  const validatePhone = (phoneNumber) => {
    const vietnamesePhoneNumberPattern =
      /^(0[1-9]|11|12|13|14|15|16|17|18|19)[0-9]{8}$/;
    return vietnamesePhoneNumberPattern.test(phoneNumber);
  };

  const checkOut = () => {
    const telNum = document.querySelector("#tel-num").value;
    const address = document.querySelector("#address").value;
    if (totalPrice === 0) {
      Toastify("error", "top-right", "Your shopping cart is empty");
      return;
    } else if (telNum === "" || address === "") {
      Toastify(
        "error",
        "top-right",
        "Please fill in all the information before checking out!"
      );
      return;
    } else if (!validatePhone(telNum)) {
      Toastify("error", "top-right", "Invalid phone number");
      return;
    } else {
      setLoadCheckout(true);
      fetch("http://localhost:8000/api/v1/payment/create/verify", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "success") {
            setLoadCheckout(false);
            Swal.fire({
              title: "Are you sure you want to checkout this order?",
              text: "You won't be able to revert this!",
              icon: "info",
              showCancelButton: true,
              timer: 60000,
              timerProgressBar: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes!",
            }).then((result) => {
              if (result.isConfirmed) {
                fetch("http://localhost:8000/api/v1/payment/pay/product", {
                  credentials: "include",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                      "authToken"
                    )}`,
                  },
                  body: JSON.stringify({
                    price: totalPrice,
                    phone: telNum,
                    address: address,
                  }),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.status === "success") {
                      Toastify(
                        "success",
                        "top-right",
                        "Successful checked out for the order"
                      );
                      document.querySelector("#tel-num").value = "";
                      document.querySelector("#address").value = "";
                      changeUser(!userChange);
                    } else {
                      Toastify(
                        "error",
                        "top-right",
                        "Something went wrong. Please try again later"
                      );
                    }
                  });
              }
            });
          }
        });
    }
  };

  const payVn = () => {
    const telNum = document.querySelector("#tel-num").value;
    const address = document.querySelector("#address").value;
    if (totalPrice === 0) {
      Toastify("error", "top-right", "Your shopping cart is empty");
      return;
    } else if (telNum === "" || address === "") {
      Toastify(
        "error",
        "top-right",
        "Please fill in all the information before checking out!"
      );
      return;
    } else {
      fetch("http://localhost:8000/api/v1/vnpay/create", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          amount: totalPrice * 100,
          bankCode: "VNBANK",
          language: "vn",
          phone: telNum,
          address: address,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          window.location.href = json.vnpUrl;
        });
    }
  };

  return (
    <>
      <Breadcrumbs
        crumbList={[{ name: "Your Shopping Cart", link: "/cart" }]}
      />
      <div className="shop-cart">
        <div className="cart--order-table">
          {cart?.length === 0 ? (
            <div className="msg-box">
              <FontAwesomeIcon icon={faCartPlus} className="msg-icon" />
              <div>
                Looks like there is no item in your shopping cart yet!!!
              </div>
              <div>Would you like to put some in before checking out?</div>
            </div>
          ) : (
            <>
              {cart?.map((item, idx) => (
                <div key={idx} className="cart--item">
                  <div
                    className="cart--item-img"
                    style={{
                      backgroundImage: `url("${item.product.image}")`,
                    }}
                  ></div>
                  <Link
                    className="cart--item-info"
                    to={`/product/${item.product._id}`}
                  >
                    <div className="cart--item-name">{item.product.title}</div>
                    <div className="cart--item-category">
                      {item.product.category.name}
                    </div>
                    <div className="cart--item-price">
                      ${item.product.price}
                    </div>
                  </Link>
                  <div className="cart--item-quantity">
                    <div className="cart--item-quantity-title">Quantity</div>
                    {item.quantity}
                  </div>

                  <div
                    className="cart--item-clear"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    {item.quantity > 1 ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} />
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="cart--order-checkout">
          <div className="cart--order-checkout-info">
            <div className="cart--order-checkout-info-row">
              <div>Total Item(s) :</div>
              <div>{userInfo?.Cart.length}</div>
            </div>
            <div className="cart--order-checkout-info-row">
              <div>Total Price :</div>
              <div>${totalPrice}</div>
            </div>
          </div>
          <div className="cart--order-checkout-inp-title">Contact</div>
          <input
            type="text"
            className="cart--order-checkout-info-inp"
            id="tel-num"
            placeholder="Please tell us your contact number"
          />
          <div className="cart--order-checkout-inp-title">Address</div>
          <input
            type="text"
            className="cart--order-checkout-info-inp"
            id="address"
            placeholder="Please tell us where to ship this order"
          />
          <div className="cart--order-checkout-btn-container">
            {loadCheckout ? (
              <div className="cart--order-checkout-btn" id="load-checkout">
                <Loader />
              </div>
            ) : (
              <div className="cart--order-checkout-btn" onClick={checkOut}>
                <FontAwesomeIcon icon={faCashRegister} id="cash-regis-icon" />
                CHECKOUT
              </div>
            )}
            <div
              className="cart--order-checkout-btn"
              id="vnpay"
              onClick={payVn}
            ></div>
          </div>
          <div className="balance-card">
            <div className="balance-card-info">
              <div className="balance-card-info-name">{userInfo?.FullName}</div>
              <div
                className="balance-card-info-avt"
                style={{ backgroundImage: `url(${userInfo?.Image_Avatar})` }}
              ></div>
            </div>
            <div className="balance-card-balance">
              ${balance.toLocaleString()}
            </div>
            <div className="balance-card-footer">
              <div className="balance-card-footer-logo">THE MEGA MALL</div>
              <div className="balance-card-footer-credit">
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
