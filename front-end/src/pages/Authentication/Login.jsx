import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const login = async () => {
    const name = document.querySelector("#login-name").value;
    const password = document.querySelector("#login-password").value;
    try {
      const response = await fetch(
        "https://themegamall.onrender.com/api/v1/user/account/login",
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
      localStorage.setItem("token", data.token);
      if (data.token) {
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ggLogin = async () => {
    try {
      const response = await fetch(
        "https://themegamall.onrender.com/api/v1/user/account/login/auth/google",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.token) {
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <>
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
        {error && (
          <div className="auth-error-msg">
            Something's incorrect! Please try again
          </div>
        )}
        <button onClick={login} className="submit-btn">
          LOGIN
        </button>
      </div>
      <div className="authen-route">
        Don't have an account?{" "}
        <Link to="/authentication/register">Sign Up</Link>
      </div>
      <p>
        <span>or login with</span>
      </p>
      <Link
        to="https://themegamall.onrender.com/api/v1/user/account/login/auth/google"
        className="gg-login"
      ></Link>
    </>
  );
};

export default Login;
