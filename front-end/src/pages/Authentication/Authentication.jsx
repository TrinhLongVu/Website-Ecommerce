import { useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import "./authentication.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Authentication = ({ authenType }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    } else {
      return;
    }
  }, []);
  return (
    <>
      <div className="auth">
        <div className="authen-frame">
          <h1 className="authen-title">{authenType}</h1>
          {authenType === "Login" ? <Login /> : <Register />}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Authentication;
