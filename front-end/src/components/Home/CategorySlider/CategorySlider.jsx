import { Link } from "react-router-dom";

import "./category-slider.css";

const CategorySlider = ({ categoryList }) => {
  return (
    <div className="categories-list">
      {categoryList.map((category, idx) => (
        <Link
          to={`/categories/${category.name}`}
          key={idx}
          className="category-card"
        >
          <div className="category-card-bg"></div>
          <h3 className="category-card-name">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategorySlider;
