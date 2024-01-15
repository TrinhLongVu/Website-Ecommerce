import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import Toastify from "../../../components/Toastify/Toastify";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const login = async () => {
    const name = document.querySelector("#login-name").value;
    const password = document.querySelector("#login-password").value;
    if (!name || !password) {
      Toastify("error", "top-right", "Please fill all the information");
    } else {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/user/account/login",
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: name,
              password: password,
            }),
          }
        );
        const data = await response.json();
        if (data.token) {
          navigate("/");
        }
        if (data.status === "failed") {
          Toastify(
            "error",
            "top-right",
            "Something's incorrect. Please try again with the correct login information!!!"
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <>
      <h1 className="authen-title">Login</h1>
      <div>
        <div className="input-box">
          <FontAwesomeIcon icon={faEnvelope} className="field-ico" />
          <input
            type="email"
            className="input-field"
            id="login-name"
            placeholder="Email Address"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            id="login-password"
            placeholder="Password"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="forgot-pwd">
          <a href="">Forgot Password ?</a>
        </div>
        <button onClick={login} className="submit-btn">
          LOGIN
        </button>
      </div>
      <div className="authen-route">
        Don't have an account? <Link to="/auth/register">Sign Up</Link>
      </div>
      <p>
        <span>or login with</span>
      </p>
      <Link
        to="http://localhost:8000/api/v1/user/account/login/auth/google"
        className="gg-login"
      ></Link>
    </>
  );
};

export default Login;
