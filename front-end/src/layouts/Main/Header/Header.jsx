import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
  faRightToBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
// Style
import "./header.css";

const Header = ({ categoryList }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showAvtDropdown, setShowAvtDropdown] = useState(false);

  const openCategoriesDropdown = () => {
    clearTimeout(timeoutRef.current);
    setShowCategoriesDropdown(true);
  };

  const closeCategoriesDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCategoriesDropdown(false);
    }, 100);
  };

  const showAvatarDropdown = () => {
    setShowAvtDropdown(!showAvtDropdown);
  };

  document.body.addEventListener("click", () => {
    if (!event.target.closest(".avt-dropdown-btn")) {
      setShowAvtDropdown(false);
    }
  });

  const [searchField, setSearchField] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${searchField}`);
    }
  };

  const authenticated = true;

  return (
    <header>
      <Link to="/" className="main-logo">
        THE MEGA MALL
      </Link>
      <div className="list-shower-container">
        <div className="list-shower">
          <div
            className="list-shower-title"
            onMouseEnter={openCategoriesDropdown}
            onMouseLeave={closeCategoriesDropdown}
          >
            <Link to="/categories">Categories</Link>
            <div className="dropdown-ico">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
          {showCategoriesDropdown && (
            <div
              className="dropdown-menu left-dropdown"
              onMouseEnter={openCategoriesDropdown}
              onMouseLeave={closeCategoriesDropdown}
            >
              {categoryList.map((category, index) => (
                <Link to={`/categories/${category.name}`} key={index}>
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          onChange={(e) => setSearchField(e.target.value)}
          className="search-input"
          placeholder="Search Articles"
          onKeyDown={handleKeyPress}
        />
        <Link to={`/search/${searchField}`} id="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} id="search-ico" />
        </Link>
      </div>
      {authenticated ? (
        <>
          <Link to="/cart" className="home-shop-cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <div
            className="avt-dropdown-btn"
            style={{ backgroundImage: `url("https://i.pravatar.cc/301")` }}
            onClick={showAvatarDropdown}
          >
            {showAvtDropdown && (
              <div className="dropdown-menu" id="avt-dropdown">
                <Link to="/user">
                  <FontAwesomeIcon icon={faUser} className="profile-ico" />
                  Profile
                </Link>
                <hr />
                <Link>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="profile-ico"
                  />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <Link to="/authentication/login" className="head-login-btn">
          LOGIN
          <FontAwesomeIcon icon={faRightToBracket} className="head-login-ico" />
        </Link>
      )}
    </header>
  );
};

export default Header;
