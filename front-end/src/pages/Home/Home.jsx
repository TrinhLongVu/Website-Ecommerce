import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import CategorySlider from "../../components/Home/CategorySlider/CategorySlider";

import "./home.css";

const Home = () => {
  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faTags} /> Categories
          </h2>
          <Link to="/categories" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <CategorySlider />
        </div>
        {/*</div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faEye} /> Most Read
          </h2>
        </div>
        <div className="home-section-content">
          <ArticleSlider />
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faHeart} /> Most Liked
          </h2>
          <Link to="/" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <div className="product-container">
            {likedArticleList.map((article, index) => (
              <ArticlePanel key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faMedal} /> Popular
          </h2>
          <Link to="/" className="show-all-btn">
            Show all <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="home-section-content">
          <div className="product-container">
            {popularArticleList.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faNewspaper} /> New
          </h2>
        </div>
        <div className="home-section-content">
          <ArticleList />
        </div> */}
      </div>
    </>
  );
};

export default Home;
