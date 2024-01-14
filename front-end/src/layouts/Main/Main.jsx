// Libraries
import { useEffect, useState } from "react";
// Components
import Header from "./Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
// Style
import "react-toastify/dist/ReactToastify.css";
// Implementation
const MainLayout = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userChange, changeUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken !== undefined) {
      localStorage.setItem("authToken", cookieToken);
      Cookies.remove("token");
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
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

        if (data.data.Role === "admin") {
          navigate("/admin");
        } else {
          setUserInfo(data.data);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        navigate("/");
      }
    };
    fetchData();
  }, [userChange]);
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/category")
      .then((res) => res.json())
      .then((json) => {
        setCategoryList(json.data);
      });
  }, []);
  return (
    <>
      <Header
        categoryList={categoryList}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Outlet context={{ categoryList, userInfo, userChange, changeUser }} />
      <Footer categoryList={categoryList} />
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

export default MainLayout;
