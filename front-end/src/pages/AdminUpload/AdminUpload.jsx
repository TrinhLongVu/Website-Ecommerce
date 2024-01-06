import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faAngleDown,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import ProductFrame from "../../components/ProductFrame/ProductFrame";
import "./admin-upload.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOutletContext } from "react-router-dom";

const AdminUpload = () => {
  const { categoryList } = useOutletContext();
  const [showList, setShowList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleList = () => {
    setShowList(!showList);
    if (!showList) {
      document.querySelector(".admin-upload-select").style.borderRadius =
        "15px 15px 0 0";
    } else {
      document.querySelector(".admin-upload-select").style.borderRadius =
        "15px";
    }
  };

  const handleCategoryClick = (categoryName) => {
    document.querySelector(".admin-upload-select-title").style.color = "black";
    document.querySelector(".admin-upload-select-title").style.opacity = "1";
    setSelectedCategory(categoryName);
    toggleList();
  };

  const [previewProduct, setPreviewProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

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

  const handlePreview = () => {
    const previewProduct = {
      title: document
        .querySelector(".admin-upload-input-name")
        .value.replace("\n", " "),
      detail: document.querySelector(".admin-upload-textarea").value,
      price: document.querySelector(".admin-upload-input-price").value,
      image: previewImage,
      isPreview: true,
    };
    setPreviewProduct(previewProduct);
  };

  const uploadProduct = async () => {
    const productName = document.querySelector(
      ".admin-upload-input-name"
    ).value;
    const productPrice = document.querySelector(
      ".admin-upload-input-price"
    ).value;
    const productDetail = document.querySelector(
      ".admin-upload-textarea"
    ).value;
    if (
      !productName ||
      !productPrice ||
      !productDetail ||
      !selectedCategory ||
      !image
    ) {
      toast.error(
        "Looks like you haven't input enough information for your new product",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else if (isNaN(productPrice)) {
      toast.error("Price of your product should be a number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        let formData = new FormData();
        formData.append("title", productName);
        formData.append("price", productPrice);
        formData.append("detail", productDetail);
        formData.append("category", selectedCategory);
        formData.append("image", image);
        const response = await fetch("http://localhost:8000/api/v1/product", {
          credentials: "include",
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.success("Your new product has been released in the store!!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          document.querySelector(".admin-upload-input-name").value = "";
          document.querySelector(".admin-upload-input-price").value = "";
          document.querySelector(".admin-upload-textarea").value = "";
          document.querySelector(".admin-upload-select-title").style.color =
            "#3e3232";
          document.querySelector(".admin-upload-select-title").style.opacity =
            "0.75";
          setSelectedCategory("");
          setImage(null);
          setPreviewImage(null);
          setPreviewProduct(null);
        } else {
          toast.error("Looks like there's some error!!! Please try again", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="admin-upload">
        <div className="admin-upload-left">
          <div className="admin-upload-info-side" id="admin-upload-price">
            Name
            <input
              type="text"
              placeholder="What's your new product name?"
              className="admin-upload-input-name"
            />
          </div>
          <div className="admin-upload-info">
            <div className="admin-upload-info-side" id="admin-upload-title">
              Price
              <input
                type="text"
                placeholder="What's the price of your new product?"
                className="admin-upload-input-price"
              />
            </div>
            <div className="admin-upload-info-side" id="admin-upload-category">
              Category
              <div className="admin-upload-select">
                <div className="admin-upload-select-title">
                  {selectedCategory ? selectedCategory : "Choose category"}
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    id="admin-upload-show-list-icon"
                    onClick={toggleList}
                  />
                </div>
                {showList && (
                  <div className="admin-upload-select-list">
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

          <div className="admin-upload-content">
            Description
            <div className="admin-upload-content-container">
              <textarea
                className="admin-upload-textarea"
                placeholder="Please tell customers some information about your new product..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="admin-upload-right">
          Image
          <div className="admin-upload-thumbnail">
            <div
              className="admin-upload-thumbnail-frame"
              style={{ backgroundImage: `url(${previewImage})` }}
            >
              {!previewImage && (
                <div className="admin-upload-thumbnail-text">
                  Add an image for your new product
                </div>
              )}
            </div>
            <label
              htmlFor="file-upload"
              className="admin-upload-thumbnail-upload"
            >
              Choose file
            </label>
            <input type="file" id="file-upload" onChange={handleImageChange} />
          </div>
          <div className="admin-upload-control">
            <div className="admin-upload-control-item" onClick={handlePreview}>
              <FontAwesomeIcon
                icon={faEye}
                className="admin-upload-control-ico"
              />
              Preview
            </div>
            <div
              className="admin-upload-control-item"
              id="admin-upload-control-publish"
              onClick={uploadProduct}
            >
              <FontAwesomeIcon
                icon={faUpload}
                className="admin-upload-control-ico"
              />
              Upload
            </div>
          </div>
        </div>
      </div>
      {previewProduct && (
        <div className="admin-upload-preview">
          <div className="admin-upload-preview-frame">
            <ProductFrame product={previewProduct} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUpload;
