//
import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCircleUp,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import ProductFrame from "../../../components/ProductFrame/ProductFrame";
import Loader from "../../../components/Loader/Loader";
import Toastify from "../../../components/Toastify/Toastify";

import "./admin-update.css";

const AdminUpdate = () => {
  const { id } = useParams();
  const { categoryList } = useOutletContext();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [showList, setShowList] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/product/" + id)
      .then((res) => res.json())
      .then((json) => {
        setCategory(json.data.category.name);
        const productDetail = json.data.detail.split("\n");
        json.data.detail = productDetail;
        json.data.isPreview = true;
        setProduct(json.data);
        setPreviewImage(json.data.image);
      });
  }, [id, updated]);

  const toggleList = () => {
    setShowList(!showList);
    if (!showList) {
      document.querySelector(".admin-update-select").style.borderRadius =
        "15px 15px 0 0";
    } else {
      document.querySelector(".admin-update-select").style.borderRadius =
        "15px";
    }
  };

  const handleCategoryClick = (categoryName) => {
    document.querySelector(".admin-update-select-title").style.color = "black";
    document.querySelector(".admin-update-select-title").style.opacity = "1";
    setCategory(categoryName);
    toggleList();
  };

  const updateProduct = async () => {
    const productName = document.querySelector(
      ".admin-update-input-name"
    ).value;
    const productPrice = document.querySelector(
      ".admin-update-input-price"
    ).value;
    const productDetail = document.querySelector(
      ".admin-update-textarea"
    ).value;
    if (isNaN(productPrice)) {
      Toastify(
        "error",
        "top-right",
        "Price of your product should be a number"
      );
    } else {
      try {
        let formData = new FormData();
        formData.append("title", productName);
        formData.append("price", productPrice);
        formData.append("detail", productDetail);
        formData.append("category", category);
        if (image) {
          formData.append("image", image);
        }
        setUpdating(true);
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://localhost:8000/api/v1/product/" + id,
          {
            credentials: "include",
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          Toastify("success", "top-right", "Your product has been updated");
          setUpdating(false);
          setImage(null);
          setUpdated(!updated);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          Toastify(
            "error",
            "top-right",
            "Looks like there's some error!!! Please try again"
          );
          setUpdating(false);
        }
      } catch (error) {
        Toastify(
          "error",
          "top-right",
          "Looks like there's some error!!! Please try again"
        );
        setUpdating(false);
      }
    }
  };

  return (
    <>
      <Link className="admin-navigate-back" to="/admin/products">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <ProductFrame product={product} />
      <h1 className="admin-update-title">Update Product</h1>
      <div className="admin-update">
        <div className="admin-update-left">
          <div className="admin-update-info-side" id="admin-update-price">
            Name
            <input
              type="text"
              placeholder="What's the new name for this product?"
              className="admin-update-input-name"
              defaultValue={product.title}
            />
          </div>
          <div className="admin-update-info">
            <div className="admin-update-info-side" id="admin-update-title">
              Price
              <input
                type="text"
                placeholder="What's the new price of this product?"
                className="admin-update-input-price"
                defaultValue={product.price}
              />
            </div>
            <div className="admin-update-info-side" id="admin-update-category">
              Category
              <div className="admin-update-select">
                <div className="admin-update-select-title">
                  {category ? category : "Choose category"}
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    id="admin-update-show-list-icon"
                    onClick={toggleList}
                  />
                </div>
                {showList && (
                  <div className="admin-update-select-list">
                    {categoryList.map((category, index) => (
                      <div
                        key={index}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="admin-update-content">
            Description
            <div className="admin-update-content-container">
              <textarea
                className="admin-update-textarea"
                placeholder="Please tell customers new information about this product..."
                defaultValue={product.detail?.join("\n")}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="admin-update-right">
          Image
          <div className="admin-update-thumbnail">
            <div
              className="admin-update-thumbnail-frame"
              style={{ backgroundImage: `url(${previewImage})` }}
            >
              {!previewImage && (
                <div className="admin-update-thumbnail-text">
                  Add an image for your new product
                </div>
              )}
            </div>
            <label
              htmlFor="file-upload"
              className="admin-update-thumbnail-upload"
            >
              Choose file
            </label>
            <input type="file" id="file-upload" onChange={handleImageChange} />
          </div>
          <div className="admin-update-control">
            <div
              className="admin-update-control-item"
              id="admin-update-control-publish"
              onClick={updateProduct}
            >
              {updating ? (
                <Loader />
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faCircleUp}
                    className="admin-update-control-ico"
                  />
                  Update
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUpdate;
