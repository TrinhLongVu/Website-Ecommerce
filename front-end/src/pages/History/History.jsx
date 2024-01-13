import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import "./history.css";
import { useOutletContext } from "react-router-dom";

const History = () => {
  const { userInfo } = useOutletContext();
  const [historyList, setHistoryList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/payment/transaction/" + userInfo?._id, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data.Transaction);
        setHistoryList(json.data.Transaction);
      });
  }, [userInfo]);

  const product = {
    title: "Iphone 13 Pro Max",
    category: "Smartphone",
    price: 100,
    quantity: 2,
    image:
      "https://www.apple.com/v/iphone-15/c/images/overview/closer-look/all_colors__d4w03v51nwcy_large.jpg",
  };

  const productList = [product, product, product];
  const formatTime = (time) => {
    const dateTime = new Date(time);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    const result = `${formattedTime}, ${formattedDate}`;
    return result;
  };

  return (
    <>
      <Breadcrumbs
        crumbList={[{ name: "Your Purchased History", link: "/history" }]}
      />
      <div className="history-list">
        {historyList.map((order, index) => (
          <div className="history-order">
            <div className="history-order-banner">
              <div
                className="history-order-banner-avt"
                style={{ backgroundImage: `url(${userInfo?.Image_Avatar})` }}
              ></div>
              <div className="history-order-banner-info" id="order-name">
                {userInfo?.FullName}
              </div>
              <div className="history-order-banner-info" id="order-time-tel">
                <div>{formatTime(order.time)}</div>
                <div>{order.phone}</div>
              </div>
              <div className="history-order-banner-info" id="order-address">
                {order.address}
              </div>
              <div className="history-order-banner-info" id="order-price">
                <div>Total</div>
                <div>${order.moneyTransaction}</div>
              </div>
            </div>
            <div className="history-order-content">
              {order.cart_id.map((product, index) => (
                <div className="history-order-item">
                  <div
                    className="history-order-item-img"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <div className="history-order-item-info">
                    <div className="history-order-item-title">
                      {product.title}
                    </div>
                    <div>{product.category}</div>
                  </div>
                  <div className="history-order-item-num">
                    <div>Price</div>
                    <div>${product.price}</div>
                  </div>
                  <div className="history-order-item-num">
                    <div>Quantity</div>
                    <div>{product.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
