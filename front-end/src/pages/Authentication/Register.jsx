import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div action="">
        <div className="input-box">
          <FontAwesomeIcon icon={faEnvelope} className="field-ico" />
          <input
            type="email"
            className="input-field"
            id="register-email"
            placeholder="Email Address"
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            id="register-pass"
            placeholder="Password"
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            id="register-confirm-pass"
            placeholder="Confirm Password"
          />
        </div>
        {error !== "" && <div className="auth-error-msg">{error}</div>}
        <div className="agreed-term">
          By clicking "Register" you agree to our terms and privacy policy.
        </div>
        <button className="submit-btn" onClick={register}>
          REGISTER
        </button>
      </div>
      <div className="authen-route">
        Already have an account? <Link to="/authentication/login">Sign In</Link>
      </div>
    </>
  );
};

export default Register;
