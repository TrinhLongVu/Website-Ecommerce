import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useOutletContext } from "react-router-dom";

import "./admin-user.css";

const AdminUser = () => {
  const user = {
    image: "https://i.pravatar.cc/301",
    name: "Simon Gin Sa Murasaki",
  };
  const userList = [user, user, user, user, user, user, user];

  const deleteUser = (id) => { };
  return (
    <div className="admin-user">
      {userList.map((user, index) => (
        <div key={index} className="admin-user-card">
          <div
            className="admin-user-card-img"
            style={{ backgroundImage: `url(${user.image})` }}
          ></div>
          <div className="admin-user-card-name">{user.name}</div>

          <div className="admin-user-card-role">
            User
          </div>

          <div className="admin-user-card-btn-container">
            <Link

              className="admin-user-card-btn"
              id="admin-user-card-update"
            >
              <FontAwesomeIcon
                icon={faCircleUp}
                className="admin-user-card-btn-icon"
              />
            </Link>
            <div
              className="admin-user-card-btn"
              id="admin-user-card-delete"
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="admin-user-card-btn-icon"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUser;