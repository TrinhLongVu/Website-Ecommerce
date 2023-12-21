import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import MultiCategory from "./pages/MultiCategory/MultiCategory";
import SingleCategory from "./pages/SingleCategory/SingleCategory";
import ShopCart from "./pages/ShopCart/ShopCart";

import UserInfo from "./pages/UserInfo/UserInfo";

import Authentication from "./pages/Authentication/Authentication";

import AdminUpload from "./pages/AdminUpload/AdminUpload";

import ScrollTop from "./components/ScrollTop/ScrollTop";

import Main from "./layouts/Main";
import Admin from "./layouts/Admin/Admin";

function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/categories">
            <Route index element={<MultiCategory />} />
            <Route path="/categories/:name" element={<SingleCategory />} />
          </Route>
          <Route path="/product" element={<Detail />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/cart" element={<ShopCart />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Route>
        <Route path="/authentication">
          <Route
            path="/authentication/login"
            element={<Authentication authenType={"Login"} />}
          />
          <Route
            path="/authentication/register"
            element={<Authentication authenType={"Register"} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
