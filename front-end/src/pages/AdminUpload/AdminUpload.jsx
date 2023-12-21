import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPaperPlane,
  faAngleDown,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { categoryList } from "../../Global";
import { useState, useEffect } from "react";
import "./admin-upload.css";
import ProductFrame from "../../components/ProductFrame/ProductFrame";

const AdminUpload = () => {
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
      name: document
        .querySelector(".admin-upload-input")
        .value.replace("\n", " "),
      desc: document.querySelector(".admin-upload-textarea").value,
      price: document.querySelector(".admin-upload-input-price").value,
      image: previewImage,
    };
    setPreviewProduct(previewProduct);
  };

  const uploadProduct = () => {};

  return (
    <>
      <div className="admin-upload">
        <div className="admin-upload-left">
          <div className="admin-upload-info">
            <div className="admin-upload-info-side" id="admin-upload-title">
              Name
              <input
                type="text"
                placeholder="What is your product's name?"
                className="admin-upload-input"
              />
            </div>
            <div className="admin-upload-info-side" id="admin-upload-category">
              Category
              <div className="admin-upload-select">
                <div className="admin-upload-select-title">
                  {selectedCategory
                    ? selectedCategory
                    : "Choose category for your article"}
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
          <div className="admin-upload-info-side" id="admin-upload-price">
            Price
            <input
              type="text"
              placeholder="What's the price of this new product?"
              className="admin-upload-input-price"
            />
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
