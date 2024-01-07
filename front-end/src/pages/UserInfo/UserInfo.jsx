import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import "./user-info.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Toastify from "../../components/Toastify/Toastify";
import Loader from "../../components/Loader/Loader";
import { format } from "date-fns";

const UserInfo = () => {
  const navigate = useNavigate();
  const { userChange, changeUser } = useOutletContext();
  const [id, setId] = useState("");
  const [avt, setAvt] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [changeAvt, setChangeAvt] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
      }
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/user/information/user",
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.data.Birthday) {
          const dateObj = new Date(data.data.Birthday);
          const formattedBirthday = format(dateObj, "yyyy-MM-dd");
          setBirthday(formattedBirthday);
        }
        setFullName(data.data.FullName);
        setGender(data.data.Gender);
        setPhone(data.data.PhoneNumber);
        setAddress(data.data.Address);
        setAvt(data.data.Image_Avatar);
        setId(data.data._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isEditMode]);

  const formatDate = (date) => {
    const parts = date.split("-");
    const transformedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return transformedDate;
  };

  const saveInfoChanges = async () => {
    let formData = new FormData();
    if (fullName) {
      formData.append("FullName", fullName);
    }
    if (gender) {
      formData.append("Gender", gender);
    }
    if (phone) {
      formData.append("PhoneNumber", phone);
    }
    if (address) {
      formData.append("Address", address);
    }
    if (birthday) {
      formData.append("Birthday", formatDate(birthday));
    }
    if (changeAvt) {
      formData.append("image", changeAvt);
    }
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:8000/api/v1/user/` + id, {
        credentials: "include",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        Toastify(
          "success",
          "top-right",
          "Successfully update your information"
        );
        setChangeAvt(null);
        changeUser(!userChange);
        setIsEditMode(false);
      } else {
        setChangeAvt(null);
        Toastify(
          "error",
          "top-right",
          "Looks like you there is some error!!! Please try again"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setUpdating(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setChangeAvt(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvt(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Breadcrumbs crumbList={[{ name: "User Information", link: "/user" }]} />
      <div className="info-avt-container">
        <div className="info-left-contaier">
          <div className="info--avt">
            <div
              className="avatar-big"
              style={{ backgroundImage: `url(${avt})` }}
            ></div>
            {isEditMode && (
              <>
                <label htmlFor="info--avt-upload" className="info--avt-change">
                  <FontAwesomeIcon icon={faEdit} id="info--avt-edit" />
                  Change Avatar
                </label>
                <input
                  type="file"
                  id="info--avt-upload"
                  onChange={handleAvatarChange}
                />
              </>
            )}
          </div>
          <div className="info--acc-delete-container">
            <div className="info--acc-delete">
              <FontAwesomeIcon icon={faUserXmark} id="info--acc-del-icon" />
              DELETE
            </div>
          </div>
        </div>

        <div className="info">
          <div className="info-field">
            <h3 className="title-input">Full Name</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          <div className="info-field">
            <h3 className="title-input">Birthday</h3>
            <input
              className="info-inp"
              type="date"
              value={birthday}
              placeholder="Unknown"
              onChange={(e) => setBirthday(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-field">
            <h3 className="title-input">Gender</h3>
            <input
              className="info-inp"
              type="text"
              id="gender"
              placeholder="Unknown"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-field">
            <h3 className="title-input">Phone number</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          <div className="info-field">
            <h3 className="title-input">Address</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-action-row">
            <div className="info-action-btn-container">
              {updating ? (
                <div className="info-update-loader">
                  <Loader />
                </div>
              ) : (
                <>
                  {isEditMode ? (
                    <>
                      <div
                        className="info-action-btn"
                        id="info-save-btn"
                        onClick={saveInfoChanges}
                      >
                        Save
                      </div>
                      <div
                        className="info-action-btn"
                        onClick={setIsEditMode.bind(null, false)}
                      >
                        Cancel
                      </div>
                    </>
                  ) : (
                    <div
                      className="info-action-btn"
                      onClick={setIsEditMode.bind(null, true)}
                    >
                      Change Information
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
