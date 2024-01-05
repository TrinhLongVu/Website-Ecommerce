// Libraries
import { useEffect, useState } from "react";
// Components
import Header from "./Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
// Style
import "react-toastify/dist/ReactToastify.css";
// Implementation
const MainLayout = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/user/infomation/user",
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.Role === "admin") {
          navigate("/admin");
        } else {
          setUserInfo(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
