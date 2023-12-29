// Library
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assets
import { faChevronRight, faTag } from "@fortawesome/free-solid-svg-icons";
// Components
import ProductFrame from "../../components/ProductFrame/ProductFrame";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
// Implementation
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("https://themegamall.onrender.com/api/v1/product/" + id)
      .then((res) => res.json())
      .then((json) => {
        const productDetail = json.data.detail.split("\n");
        json.data.detail = productDetail;
        setProduct(json.data);
      });
  });

  const relatedProduct = {
    id: "123",
    title: "Celestial Glow Crystal Pendant dad add",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    detail:
      "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accessory for both casual and formal occasions. Smartly designed 10mm drivers enhanced by the buds' form factor deliver JBL's Pure Bass Sound so you'll feel every pulsing beat.\nThanks to the next generation Bluetooth technology, the JBL Tune Buds earbuds stream audio with low power consumption at high quality. Plus, BT 5.3 allows to stream synchronized audio independently to each earbud, so that you can use either or both earbuds. Or you can share your video or music content with a friend wearing headphones, as BT 5.3 lets you seamlessly stream audio to multiple listeners. (*) Available via OTA update at a later stage",
    price: "$89.99",
    time: "2 hours ago",
  };

  const productList = [relatedProduct, relatedProduct, relatedProduct];
  return (
    <>
      <ProductFrame product={product} />
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTag} /> Related Products
          </h2>
          <Link to="/" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <ProductShelf products={productList} />
        </div>
      </div>
    </>
  );
};

export default Detail;
