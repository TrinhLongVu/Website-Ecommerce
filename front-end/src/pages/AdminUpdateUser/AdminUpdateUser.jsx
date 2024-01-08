import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./admin-update-user.css";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import Toastify from "../../components/Toastify/Toastify";
import Loader from "../../components/Loader/Loader";
import { format } from "date-fns";

const AdminUpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userChange, changeUser } = useOutletContext();
  const [avt, setAvt] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [infoObj, setInfoObj] = useState({});
  const [createdDate, setCreatedDate] = useState("");
  const [changeAvt, setChangeAvt] = useState(null);
  const [updating, setUpdating] = useState(false);

  // const isoDateString = "2023-12-31T14:31:44.568Z";
  // const isoDate = new Date(isoDateString);

  // // Format the date to a more readable format
  // const formattedDate = isoDate.toLocaleString();

  // console.log(formattedDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/user/" + id,
          {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const data = await response.json();
        console.log(data.data);
        if (data.data.Birthday) {
          const dateObj = new Date(data.data.Birthday);
          const formattedBirthday = format(dateObj, "yyyy-MM-dd");
          setBirthday(formattedBirthday);
        }
        const isoDate = new Date(data.data.createdAt);
        const formattedDate = isoDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const formattedTime = isoDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const formattedDateTime = `${formattedDate}, ${formattedTime}`;
        data.data.createdAt = formattedDateTime;

        setFullName(data.data.FullName);
        setGender(data.data.Gender);
        setPhone(data.data.PhoneNumber);
        setAddress(data.data.Address);
        setAvt(data.data.Image_Avatar);
        setInfoObj(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, isEditMode]);

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
        </div>

        <div className="info">
          {infoObj.type === "local" && (
            <div className="info-field">
              <h3 className="title-input">Email</h3>
              <input
                className="info-inp"
                type="text"
                placeholder="Unknown"
                value={infoObj.UserName}
                readOnly
              />
            </div>
          )}
          <div className="info-field">
            <h3 className="title-input">Created</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={infoObj.createdAt}
              readOnly
            />
          </div>
          <div className="info-field">
            <h3 className="title-input">Role</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={infoObj.Role}
              readOnly
            />
          </div>
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

export default AdminUpdateUser;
