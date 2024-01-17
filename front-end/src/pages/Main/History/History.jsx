import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Pagination from "../../../components/Pagination/Pagination";

import "./history.css";

const History = () => {
  const { userInfo } = useOutletContext();
  const [historyList, setHistoryList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(
      "http://localhost:8000/api/v1/payment/transaction/" +
        userInfo?._id +
        `?limit=3&page=${currentPage}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setHistoryList(json.data);
        setTotalPages(json.totalPage);
      });
  }, [userInfo, currentPage]);
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
        {historyList?.map((order, index) => (
          <>
            <p className="history-order-time">
              <span>{formatTime(order.time)}</span>
            </p>
            <div className="history-order" key={index}>
              <div className="history-order-banner">
                <div
                  className="history-order-banner-avt"
                  style={{ backgroundImage: `url(${userInfo?.Image_Avatar})` }}
                ></div>
                <div className="history-order-banner-info" id="order-name">
                  {userInfo?.FullName}
                </div>
                <div className="history-order-banner-info" id="order-tel">
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
                  <Link
                    className="history-order-item"
                    key={index}
                    to={`/product/${product.product_id._id}`}
                  >
                    <div
                      className="history-order-item-img"
                      style={{
                        backgroundImage: `url(${product.product_id.image})`,
                      }}
                    ></div>
                    <div className="history-order-item-info">
                      <div className="history-order-item-title">
                        {product.product_id.title}
                      </div>
                    </div>
                    <div className="history-order-item-num">
                      <div>Price</div>
                      <div>${product.product_id.price}</div>
                    </div>
                    <div className="history-order-item-num">
                      <div>Quantity</div>
                      <div>{product.quantity}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default History;
