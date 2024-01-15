import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
  faRightToBracket,
  faCartShopping,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import Toastify from "../../../components/Toastify/Toastify";
// Style
import "./header.css";

const Header = ({ categoryList, userInfo, setUserInfo }) => {
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

  const search = () => {
    if (searchField === "") {
      Toastify(
        "error",
        "top-right",
        "Please input some keywords before searching"
      );
    } else {
      navigate(`/search/${searchField}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    setUserInfo(null);
    navigate("/");
  };

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
          placeholder="Search Products"
          onKeyDown={handleKeyPress}
        />
        <Link id="search-btn" onMouseDown={search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="search-ico" />
        </Link>
      </div>
      {userInfo ? (
        <>
          <Link to="/cart" className="head-shop-cart">
            <FontAwesomeIcon icon={faCartShopping} />
            {userInfo.Cart.length > 0 && (
              <div className="head-cart-num">
                {userInfo.Cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            )}
          </Link>
          <div
            className="avt-dropdown-btn"
            style={{ backgroundImage: `url(${userInfo.Image_Avatar})` }}
            onClick={showAvatarDropdown}
          >
            {showAvtDropdown && (
              <div className="dropdown-menu" id="avt-dropdown">
                <Link to="/user">
                  <FontAwesomeIcon icon={faUser} className="profile-ico" />
                  Profile
                </Link>
                <Link to="/history">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="profile-ico"
                  />
                  Purchased
                </Link>
                <hr />
                <Link onMouseDown={logOut}>
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
        <Link to="/auth/login" className="head-login-btn">
          LOGIN
          <FontAwesomeIcon icon={faRightToBracket} className="head-login-ico" />
        </Link>
      )}
    </header>
  );
};

export default Header;
