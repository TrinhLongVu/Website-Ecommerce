import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
const MainLayout = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is missing");
        return;
      }
      try {
        const response = await fetch("http://localhost:8000/api/v1/product", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data:", data);
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
      <Header categoryList={categoryList} />
      <Outlet context={{ categoryList }} />
      <Footer categoryList={categoryList} />
    </>
  );
};

export default MainLayout;
