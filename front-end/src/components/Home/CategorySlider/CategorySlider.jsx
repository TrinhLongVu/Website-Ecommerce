import { Link } from "react-router-dom";

import "./category-slider.css";

const CategorySlider = () => {
  const category = {
    name: "Electronics",
    link: "/categories/electronics",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  };

  const categoryList = [
    category,
    category,
    category,
    category,
    category,
    category,
    category,
    category,
    category,
    category,
  ];
  return (
    <div className="categories-slider">
      {categoryList.map((category, idx) => (
        <Link to={category.link} key={idx} className="category-card">
          <div
            className="category-card-bg"
            style={{
              backgroundImage: `url("${category.img}")`,
            }}
          ></div>
          <h3 className="category-card-name">#{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategorySlider;
