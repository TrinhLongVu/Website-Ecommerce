import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./user-info.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext();
  const [infoObj, setInfoObj] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPending, setPending] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [changeAvt, setChangeAvt] = useState(null);

  useEffect(() => {
    if (userInfo === null) {
      navigate("/");
    } else {
      console.log(userInfo);
      setFullName(userInfo.FullName);
      setGender(userInfo.Gender);
      setPhone(userInfo.PhoneNumber);
      setAddress(userInfo.Address);
    }
  }, [userInfo, isEditMode]);

  const formatDate = (date) => {
    const parts = date.split("-");
    const transformedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return transformedDate;
  };

  const saveInfoChanges = () => {
    setIsEditMode(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setChangeAvt(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInfoObj({ ...infoObj, Image_Avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="info-avt-container">
        <div className="info--avt">
          <div
            className="avatar-big"
            style={{ backgroundImage: `url(${userInfo?.Image_Avatar})` }}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
