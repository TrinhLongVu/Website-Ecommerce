import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUp,
  faCircleXmark,
  faUserPlus,
  faAngleDown,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
// Components
import Toastify from "../../../components/Toastify/Toastify";
import Pagination from "../../../components/Pagination/Pagination";
import Swal from "sweetalert2";
// Style
import "./admin-user.css";

const AdminUser = () => {
  const { adminId } = useOutletContext();
  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const roleList = ["admin", "user"];
  const [listChange, setListChange] = useState(false);

  const toggleList = () => {
    setShowList(!showList);
    if (!showList) {
      document.querySelector(".admin-upload-select").style.borderRadius =
        "15px 15px 0 0";
    } else {
      document.querySelector(".admin-upload-select").style.borderRadius =
        "15px";
    }
  };

  const handleRoleClick = (role) => {
    document.querySelector(".admin-upload-select-title").style.color = "black";
    document.querySelector(".admin-upload-select-title").style.opacity = "1";
    setSelectedRole(role);
    toggleList();
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const addUser = async () => {
    const newEmail = document.querySelector("#admin-user-add-email").value;
    const newPass = document.querySelector("#admin-user-add-pass").value;
    const newName = document.querySelector("#admin-user-add-name").value;
    if (!isValidEmail(newEmail)) {
      Toastify("error", "top-right", "Invalid email");
      return;
    }
    if (!newEmail || !newPass || !newName || !selectedRole) {
      Toastify(
        "error",
        "top-right",
        "Looks like you haven't input enough information for your new product"
      );
      return;
    }
    const response = await fetch(
      "http://localhost:8000/api/v1/user/create/newUser",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          UserName: newEmail,
          Password: newPass,
          FullName: newName,
          Role: selectedRole,
        }),
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      Toastify("success", "top-right", "Successfully added new user");
      document.querySelector("#admin-user-add-email").value = "";
      document.querySelector("#admin-user-add-pass").value = "";
      document.querySelector("#admin-user-add-name").value = "";
      document.querySelector(".admin-upload-select-title").style.color =
        "#3e3232";
      document.querySelector(".admin-upload-select-title").style.opacity =
        "0.75";
      setSelectedRole("");
      setListChange(!listChange);
    } else if (json.status === "fail") {
      Toastify("error", "top-right", json.message);
    } else {
      Toastify(
        "error",
        "top-right",
        "Something's wrong. Please try again later!!!"
      );
    }
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/user/?page=${currentPage}&limit=10`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(json.totalPage);
        setUserList(json.data);
      });
  }, [listChange, currentPage]);

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure you want to do this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
              Swal.fire({
                title: "User deleted!",
                text: "User has been successfully deleted.",
                icon: "success",
              });
              if (userList.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
              setListChange(!listChange);
            } else {
              Swal.fire({
                title: "Error while deleting!",
                text: "There's some error!!! Please try again later",
                icon: "error",
              });
            }
          });
      }
    });
  };
  return (
    <>
      <div className="home-section">
        <div className="home-section-banner">
          <h2>
            <FontAwesomeIcon icon={faUserPlus} /> Add User
          </h2>
        </div>
        <div className="admin-user-add">
          <div className="admin-user-add-form">
            <div className="admin-user-add-form-row">
              <div className="admin-user-add-form-row-item">
                Email
                <input
                  type="text"
                  placeholder="Enter new account's email"
                  className="admin-user-add-inp"
                  id="admin-user-add-email"
                />
              </div>
              <div className="admin-user-add-form-row-item">
                Password
                <input
                  type="password"
                  placeholder="Enter new account's password"
                  className="admin-user-add-inp"
                  id="admin-user-add-pass"
                />
              </div>
            </div>
            <div className="admin-user-add-form-row">
              <div
                className="admin-user-add-form-row-item"
                id="admin-user-add-name-item"
              >
                Full Name
                <input
                  type="text"
                  placeholder="What's your new account's name?"
                  className="admin-user-add-inp"
                  id="admin-user-add-name"
                />
              </div>
              <div
                className="admin-user-add-form-row-item"
                id="admin-upload-category"
              >
                Role
                <div className="admin-upload-select">
                  <div className="admin-upload-select-title">
                    {selectedRole ? selectedRole : "Choose Role"}
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      id="admin-upload-show-list-icon"
                      onClick={toggleList}
                    />
                  </div>
                  {showList && (
                    <div className="admin-upload-select-list">
                      {roleList.map((role, index) => (
                        <div key={index} onClick={() => handleRoleClick(role)}>
                          {role}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="admin-user-add-btn">
            <div className="admin-user-add-btn-icon" onClick={addUser}>
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
          </div>
        </div>
      </div>
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
                  {user._id !== adminId && (
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
                  )}
                </div>
              </div>
            ))}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUser;
