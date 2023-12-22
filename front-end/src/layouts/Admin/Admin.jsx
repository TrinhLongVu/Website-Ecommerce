import React from "react";
import AdminHeader from "./AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default Admin;
