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
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    localStorage.setItem("authToken", cookieToken);
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }
      try {
        console.log(cookieToken);
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
        if (data.Role === "admin") {
          navigate("/admin");
        } else {
          setUserInfo(data.data);
          console.log(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // Cookies.remove("token");
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
      <Header
        categoryList={categoryList}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Outlet context={{ categoryList, userInfo }} />
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
