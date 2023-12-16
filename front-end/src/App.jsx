import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

import Authentication from "./pages/Authentication/Authentication";

import ScrollTop from "./components/ScrollTop/ScrollTop";

import Main from "./layouts/Main";

function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
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
