import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import MultiCategory from "./pages/MultiCategory/MultiCategory";

import Authentication from "./pages/Authentication/Authentication";

import ScrollTop from "./components/ScrollTop/ScrollTop";

import Main from "./layouts/Main";
import UserInfo from "./pages/UserInfo/UserInfo";

function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/categories">
            <Route index element={<MultiCategory />} />
            {/* <Route path="/categories/:name" element={<SingleCategory />} /> */}
          </Route>
          <Route path="/product" element={<Detail />} />
          <Route path="/user" element={<UserInfo />} />
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
