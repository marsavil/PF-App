import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import DarkMode from "../DarkMode/DarkMode";

import ProfileButton from "./NavbarButtons/ProfileButton";
import LogoutButton from "./NavbarButtons/LogoutButton";
import CartButton from "./NavbarButtons/CartButton";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const { token, admin, id: userId } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const handleProductsClick = () => {
    const productsRef = document.querySelector(".products");
    productsRef.scrollIntoView();
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar__links">
        <Link to="/">Inicio</Link>
        {admin ? <Link to="/">Agregar producto</Link> : null}
        <Link to="/home" onClick={handleProductsClick}>
          Productos
        </Link>
        {token ? (
          <div className="token_true">
            <ProfileButton darkMode={darkMode} setDarkMode={setDarkMode} />
            <CartButton userId={userId} />
            <LogoutButton />
          </div>
        ) : (
          <Link to="/login" className="ingresar">
            Iniciar sesión
          </Link>
        )}
        <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default Navbar;
