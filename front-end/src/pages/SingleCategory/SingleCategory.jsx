import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import categoryImg from "../../assets/category_bg.jpeg";
// Components
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
// Pages
import Error404 from "../Error404/Error404";
// Style
import "./single-category.css";
// Implementation
const SingleCategory = () => {
  const { name } = useParams();

  const { categoryList } = useOutletContext();

  const pageCategory = categoryList.find((category) => category.name === name);

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
      <Breadcrumbs
        crumbList={[
          { name: name, link: `/category/${pageCategory}` },
          { name: "Categories", link: "/categories" },
        ]}
      />
      {pageCategory ? (
        <>
          <div
            className="category-banner"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.25)), url(${categoryImg})`,
            }}
          >
            <FontAwesomeIcon icon={faTag} className="category-banner-icon" />
            {pageCategory.name}
          </div>
          <ProductShelf products={productList} />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default SingleCategory;
