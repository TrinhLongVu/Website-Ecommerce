import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUp,
  faCircleXmark,
  faStore,
  faTags,
  faCirclePlus,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Filter from "../../../components/Filter/Filter";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import Toastify from "../../../components/Toastify/Toastify";
import Swal from "sweetalert2";
import { Link, useOutletContext } from "react-router-dom";

import "./admin-products.css";

const AdminProducts = () => {
  const domain = "http://localhost:8000/api/v1/product?";
  const { categoryList, categoryUpdate, setCategoryUpdate } =
    useOutletContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [productList, setProductList] = useState([]);

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadPage, setLoadPage] = useState(false);
  const [listChange, setListChange] = useState(false);

  const filterList = ["Below $1000", "$1000 to $2000", "Above $2000"];

  const prevFilterRef = useRef("all");
  const prevPage = useRef(1);

  useEffect(() => {
    if (prevFilterRef.current !== filter) {
      setLoadPage(true);
      prevFilterRef.current = filter;
    }
    if (prevPage.current !== currentPage) {
      window.scrollTo({
        top: 380,
        behavior: "smooth",
      });
    }
    let fetchDomain = "";
    if (filter === "") {
      fetchDomain = `page=${currentPage}&limit=12`;
    } else if (filter === "Below $1000") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price&filter=0,1000`;
    } else if (filter === "$1000 to $2000") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price&filter=1000,2000`;
    } else if (filter === "Above $2000") {
      fetchDomain = `page=${currentPage}&limit=12&sort=price&filter=2000,100000`;
    }
    fetch(domain + fetchDomain)
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setProductList(json.data);
        setLoadPage(false);
      });
  }, [currentPage, filter, listChange]);

  const hideCategory = (name) => {
    fetch("http://localhost:8000/api/v1/category/hidden", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        category: name,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setCategoryUpdate(!categoryUpdate);
          setListChange(!listChange);
        }
      });
  };

  const upgradeCategory = (name) => {
    Swal.fire({
      title: "Update Category",
      input: "text",
      inputPlaceholder: "Enter new category name",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === "") {
          Swal.fire({
            title: "Invalid input!",
            text: "Please enter something for new name for the category",
            icon: "error",
          });
          return;
        } else if (result.value === name) {
          Swal.fire({
            title: "Exsisting name!",
            text: "New name for the category should be differnt from the old one",
            icon: "error",
          });
          return;
        } else if (
          categoryList.some((category) => category.name === result.value)
        ) {
          Swal.fire({
            title: "Exsisting Category!",
            text: "New name for the category shouldn't be the same as the existing one",
            icon: "error",
          });
          return;
        }
        fetch("http://localhost:8000/api/v1/category/update", {
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            category: name,
            newcategory: result.value,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status === "success") {
              setCategoryUpdate(!categoryUpdate);
              Swal.fire({
                title: "Category Updated!",
                text: `Successfully updated category name from "${name}" to "${result.value}"`,
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error while updating!",
                text: "There's some error!!! Please try again later",
                icon: "error",
              });
            }
          });
      }
    });
  };

  const addCategory = () => {
    const newCategory = document.querySelector("#add-category").value;
    if (newCategory === "") {
      Toastify(
        "error",
        "top-right",
        "Please input a name for the new category"
      );
      return;
    } else if (categoryList.some((category) => category.name === newCategory)) {
      Toastify("error", "top-right", "This category already exists");
      return;
    } else {
      fetch("http://localhost:8000/api/v1/category/admin", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: newCategory,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "success") {
            setCategoryUpdate(!categoryUpdate);
            document.querySelector("#add-category").value = "";
            Toastify(
              "success",
              "top-right",
              "Successfully added a new category"
            );
          }
        });
    }
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure you want to do this?",
      text: "You will never see this product in your store again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8000/api/v1/product/" + id, {
          credentials: "include",
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status === "success") {
              Swal.fire({
                title: "Product deleted!",
                text: "Successfully removed that product from your store",
                icon: "success",
              });
              if (productList.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
              setListChange(!listChange);
            } else {
              Swal.fire({
                title: "Error while removing!",
                text: "There's some error!!! Please try again later",
                icon: "error",
              });
            }
          });
      }
    });
  };
  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTags} /> Categories
          </h2>
        </div>
        <div className="admin-products-section-content">
          <div className="admin-products-categories-list">
            {categoryList.map((category, idx) => (
              <div className="admin-products-category-container">
                <div
                  key={idx}
                  className="category-card"
                  onClick={() => hideCategory(category.name)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="category-card-bg"></div>
                  <h3 className="category-card-name">
                    {category.isHidden ? (
                      <>
                        {hoveredIndex === idx ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              className="admin-hidden-category"
                            />
                            {category.name}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {hoveredIndex === idx ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          category.name
                        )}
                      </>
                    )}
                  </h3>
                </div>
                <div className="category-card-upgrade-container">
                  <div
                    className="category-card-upgrade-btn"
                    onClick={() => upgradeCategory(category.name)}
                  >
                    <FontAwesomeIcon icon={faCircleUp} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner" id="add-category-banner">
          <h2>
            <FontAwesomeIcon icon={faCirclePlus} /> Add Category
          </h2>
          <div className="add-category-box">
            <input
              type="text"
              id="add-category"
              placeholder="Category Name"
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
            />
            <button id="add-category-btn" onClick={addCategory}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faStore} /> Products
          </h2>
          <Filter
            filterName={"Price"}
            filter={filter}
            filterList={filterList}
            setFilter={setFilter}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="admin-products">
          {loadPage ? (
            <div className="admin-products-loader-container">
              <Loader />
            </div>
          ) : (
            <>
              {productList.map((product, index) => (
                <div key={index} className="admin-products-card">
                  <div
                    className="admin-products-card-img"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <div className="admin-products-card-name">
                    {product.title}
                  </div>
                  <div className="admin-products-card-price">
                    ${product.price.toLocaleString()}
                  </div>
                  <div className="admin-products-card-btn-container">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="admin-products-card-btn"
                      id="admin-products-card-update"
                    >
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className="admin-products-card-btn-icon"
                      />
                    </Link>
                    <div
                      className="admin-products-card-btn"
                      id="admin-products-card-delete"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="admin-products-card-btn-icon"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
