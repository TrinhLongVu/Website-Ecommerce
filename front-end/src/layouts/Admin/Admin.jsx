import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

const Admin = () => {
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
      <AdminHeader />
      <Outlet context={{ categoryList, setCategoryList }} />
    </>
  );
};

export default Admin;
