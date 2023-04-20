import "./app.scss";
import { Route, Routes, useLocation } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Error404 from "./components/Error404/Error404";

import Payment from "./components/Payment/payment";

import AddProduct from "./components/AddProduct/AddProduct";

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
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
