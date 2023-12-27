import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { categoryList } from "../../Global";
import categoryImg from "../../assets/category_bg.jpeg";
import "./single-category.css";
import ProductShelf from "../../components/ProductShelf/ProductShelf";

const SingleCategory = () => {
  const { name } = useParams();

  let pageCategory = name.charAt(0).toUpperCase() + name.slice(1);

  const bannerCategory = categoryList.find(
    (category) => category.name === pageCategory
  );

  //   const [articleList, setArticleList] = useState([]);

  //   useEffect(() => {
  //     fetch(
  //       `http://localhost:8000/api/v1/article/page/pagination?page=1&limit=12&category=${name}`
  //     )
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setArticleList(json.data);
  //       });
  //   }, []);

  const product = {
    id: "123",
    name: "Celestial Glow Crystal Pendant dad add",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    desc: "Illuminate your style with the ethereal beauty of our Celestial Glow Crystal Pendant. This exquisite piece features a radiant crystal encased in a sterling silver setting, capturing the essence of starlight in a timeless design. The pendant exudes a captivating glow that adds a touch of celestial elegance to any outfit, making it the perfect accessory for both casual and formal occasions.",
    price: "$89.99",
    time: "2 hours ago",
  };

  const productList = [product, product, product];

  return (
    <>
      {bannerCategory && (
        <div
          className="category-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.25)), url(${categoryImg})`,
          }}
        >
          <FontAwesomeIcon icon={faTag} className="category-banner-icon" />
          {bannerCategory.name}
        </div>
      )}
      <ProductShelf products={productList} />
    </>
  );
};

export default SingleCategory;
