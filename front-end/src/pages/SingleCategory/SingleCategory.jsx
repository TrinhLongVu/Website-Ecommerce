import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import categoryImg from "../../assets/category_bg.jpeg";
// Components
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../components/ProductShelf/ProductShelf";
import Pagination from "../../components/Pagination/Pagination";
// Pages
import Error404 from "../Error404/Error404";
// Style
import "./single-category.css";
// Implementation
const SingleCategory = () => {
  const { name } = useParams();

  const { categoryList } = useOutletContext();

  const pageCategory = categoryList.find((category) => category.name === name);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [name]);

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(
      `https://themegamall.onrender.com/api/v1/category/page?page=${currentPage}&limit=12&category=${name}`
    )
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setProductList(json.data);
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  }, [currentPage, name]);

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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default SingleCategory;
