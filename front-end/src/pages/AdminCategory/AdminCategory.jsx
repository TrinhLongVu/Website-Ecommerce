import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faEyeSlash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import "./admin-category.css";
import { useOutletContext } from "react-router-dom";

const AdminCategory = () => {
  const { categoryList } = useOutletContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTags} /> Categories
          </h2>
        </div>
        <div className="home-section-content">
          <div className="categories-list">
            {categoryList.map((category, idx) => (
              <div
                key={idx}
                className="category-card"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="category-card-bg"></div>
                <h3 className="category-card-name">
                  {hoveredIndex === idx ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    category.name
                  )}
                </h3>
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
            <input type="text" id="add-category" placeholder="Category Name" />
            <button id="add-category-btn">
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
