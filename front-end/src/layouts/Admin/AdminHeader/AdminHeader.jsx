import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import "./admin-header.css";

const Header = () => {
  return (
    <div className="admin--header">
      <Link to="/admin" className="logo">
        THE MEGA MALL
      </Link>
      <div>Manage category</div>
      <div>Upload product</div>
      <div>Manage Users</div>
      <div>Statistics</div>
      <div className="admin-head-logout-btn">
        LOGOUT
        <FontAwesomeIcon icon={faRightToBracket} className="head-login-ico" />
      </div>
    </div>
  );
};

export default Header;
