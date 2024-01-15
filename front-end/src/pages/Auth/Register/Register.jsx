import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Toastify from "../../../components/Toastify/Toastify";

import "./register.css";

const Register = () => {
  const register = async () => {
    const newEmail = document.querySelector("#register-email").value;
    const newPassword = document.querySelector("#register-pass").value;
    const newPassword2 = document.querySelector("#register-confirm-pass").value;
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/account/signup",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            UserName: newEmail,
            Password: newPassword,
            ConfirmPassword: newPassword2,
          }),
        }
      );

      const res = await response.json();
      if (res.status === "fail") {
        Toastify("error", "top-right", res.msg);
      } else if (res.status === "success") {
        Toastify("success", "top-right", "Successfully created new account");
        document.querySelector("#register-email").value = "";
        document.querySelector("#register-pass").value = "";
        document.querySelector("#register-confirm-pass").value = "";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      register();
    }
  };

  return (
    <>
      <h1 className="authen-title">Register</h1>
      <div>
        <div className="input-box">
          <FontAwesomeIcon icon={faEnvelope} className="field-ico" />
          <input
            type="email"
            className="input-field"
            id="register-email"
            placeholder="Email Address"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            id="register-pass"
            placeholder="Password"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            id="register-confirm-pass"
            placeholder="Confirm Password"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="agreed-term">
          By clicking "Register" you agree to our terms and privacy policy.
        </div>
        <button className="submit-btn" onClick={register}>
          REGISTER
        </button>
      </div>
      <div className="authen-route">
        Already have an account? <Link to="/auth/login">Sign In</Link>
      </div>
    </>
  );
};

export default Register;
