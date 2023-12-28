import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
const MainLayout = () => {
  const [categoryList, setCategoryList] = useState([]);
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
      <Outlet context={categoryList} />
      <Footer categoryList={categoryList} />
    </>
  );
};

export default MainLayout;
