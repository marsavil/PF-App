import "./app.scss";
import { Route, Routes, useLocation } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
