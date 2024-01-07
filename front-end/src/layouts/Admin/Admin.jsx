import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader/AdminHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Admin = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken !== undefined) {
      localStorage.setItem("authToken", cookieToken);
      Cookies.remove("token");
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
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
        if (data.data.Role === "user") {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
        localStorage.removeItem("authToken");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetch("https://themegamall.onrender.com/api/v1/category")
      .then((res) => res.json())
      .then((json) => {
        setCategoryList(json.data);
      });
  }, []);
  return (
    <>
      <AdminHeader />
      <Outlet context={{ categoryList, setCategoryList }} />
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

export default Admin;
