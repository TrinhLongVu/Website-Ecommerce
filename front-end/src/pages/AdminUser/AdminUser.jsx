import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUp,
  faCircleXmark,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Toastify from "../../components/Toastify/Toastify";

import "./admin-user.css";
import { useState, useEffect } from "react";

const AdminUser = () => {
  const [userList, setUserList] = useState([]);
  const [del, setDel] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/user/", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserList(json.data);
      });
  }, [del]);

  const deleteUser = (id) => {
    fetch("http://localhost:8000/api/v1/user/" + id, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          Toastify("success", "bottom-right", "Successfully deleted user");
          setDel(!del);
        } else {
          Toastify(
            "error",
            "bottom-right",
            "There's something wrong!!! Please try again"
          );
        }
      });
  };
  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faUsers} /> Users
          </h2>
        </div>
        <div className="home-section-content">
          <div className="admin-user">
            {userList.map((user, index) => (
              <div key={index} className="admin-user-card">
                <div
                  className="admin-user-card-img"
                  style={{ backgroundImage: `url(${user.Image_Avatar})` }}
                ></div>
                <div className="admin-user-card-name">{user.FullName}</div>

                <div className="admin-user-card-role">{user.Role}</div>

                <div className="admin-user-card-btn-container">
                  <Link
                    to={`/admin/users/${user._id}`}
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
                    onClick={() => deleteUser(user._id)}
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
        </div>
      </div>
    </>
  );
};

export default AdminUser;
