import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import "./admin-header.css";

const Header = () => {
  const classNameFunc = ({ isActive }) =>
    isActive ? "admin-nav admin-nav-active" : "admin-nav";

  const logOut = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  return (
    <div className="admin--header">
      <Link to="/admin" className="logo">
        THE MEGA MALL
      </Link>
      <NavLink to="/admin/users" className={classNameFunc}>
        Manage Users
      </NavLink>
      <NavLink to="/admin/upload" className={classNameFunc}>
        Upload Product
      </NavLink>
      <NavLink to="/admin/products" className={classNameFunc}>
        Manage Products
      </NavLink>
      <NavLink to="/admin/orders" className={classNameFunc}>
        Manage Orders
      </NavLink>
      <div className="admin-head-logout-btn" onClick={logOut}>
        LOGOUT
        <FontAwesomeIcon icon={faRightToBracket} className="head-login-ico" />
      </div>
    </div>
  );
};

export default Header;
