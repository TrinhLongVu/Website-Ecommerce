import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";

import "./admin-users.css";

const AdminUsers = () => {
  const user = {
    image: "https://i.pravatar.cc/301",
    name: "Simon Gin Sa Murasaki",
  };
  const userList = [user, user, user, user, user, user, user];

  const deleteUser = (id) => {};
  return (
    <div className="admin-users">
      {userList.map((user, index) => (
        <div key={index} className="admin-users-card">
          <div
            className="admin-users-card-img"
            style={{ backgroundImage: `url(${user.image})` }}
          ></div>
          <div className="admin-users-card-name">{user.name}</div>
          <div className="admin-users-card-delete">
            <FontAwesomeIcon
              icon={faUserXmark}
              id="admin-users-card-delete-icon"
            />
            Delete
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
