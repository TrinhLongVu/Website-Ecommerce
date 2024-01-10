import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import MultiCategory from "./pages/MultiCategory/MultiCategory";
import SingleCategory from "./pages/SingleCategory/SingleCategory";
import Search from "./pages/Search/Search";
import ShopCart from "./pages/ShopCart/ShopCart";
import UserInfo from "./pages/UserInfo/UserInfo";
import Error404 from "./pages/Error404/Error404";
import History from "./pages/History/History";

import Authentication from "./pages/Authentication/Authentication";

import AdminUser from "./pages/AdminUser/AdminUser";
import AdminUpload from "./pages/AdminUpload/AdminUpload";
import AdminUpdate from "./pages/AdminUpdate/AdminUpdate";
import AdminUpdateUser from "./pages/AdminUpdateUser/AdminUpdateUser";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminStatistics from "./pages/AdminStatistics/AdminStatistics";

import ScrollTop from "./components/ScrollTop/ScrollTop";

import Main from "./layouts/Main/Main";
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
          <Route path="/search/:key" element={<Search />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/history" element={<History />} />
          <Route path="/cart" element={<ShopCart />} />
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/users">
            <Route index element={<AdminUser />} />
            <Route path="/admin/users/:id" element={<AdminUpdateUser />} />
          </Route>
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/products">
            <Route index element={<AdminProducts />} />
            <Route path="/admin/products/:id" element={<AdminUpdate />} />
          </Route>
          <Route path="/admin/statistics" element={<AdminStatistics />} />
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
