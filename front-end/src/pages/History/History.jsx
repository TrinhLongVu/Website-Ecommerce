import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import "./history.css";

const History = () => {
  const product = {
    title: "Iphone 13 Pro Max",
    category: "Smartphone",
    price: 100,
    quantity: 2,
    image:
      "https://www.apple.com/v/iphone-15/c/images/overview/closer-look/all_colors__d4w03v51nwcy_large.jpg",
  };

  const productList = [product, product, product];

  return (
    <>
      <Breadcrumbs
        crumbList={[{ name: "Your Purchased History", link: "/history" }]}
      />
      <div className="history-list">
        <div className="history-order">
          <div className="history-order-banner"></div>
          <div className="history-order-content">
            {productList.map((product, index) => (
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
      </div>
    </>
  );
};

export default History;
