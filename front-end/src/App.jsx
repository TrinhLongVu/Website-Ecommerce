import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

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
      </Routes>
    </>
  );
}

export default App;
