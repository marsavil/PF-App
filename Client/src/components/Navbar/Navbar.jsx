import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "/assets/img/logo.png";
import DarkMode from "../DarkMode/DarkMode";

import darkProfileIcon from "/assets/img/profile-dark.png";
import lightProfileIcon from "/assets/img/profile-ligth.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const { token, admin } = JSON.parse(localStorage.getItem("userData")) ?? {};
  const cantProduct = useSelector((state) => state.cartProducts);

  const handleProductsClick = () => {
    const productsRef = document.querySelector(".products");
    productsRef.scrollIntoView();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro/a de que deseas cerrar sesión?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("userData");
      alert("Has cerrado sesión exitosamente");
    }
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
            <Link to="/profile">
              <img src={darkMode ? darkProfileIcon : lightProfileIcon} alt={darkMode ? "Light Mode" : "Dark Mode"} />
            </Link>
            <Link to="/cart" className="perfil">
              <div className="cart">
                {cantProduct ? cantProduct.length : ""}
                <img
                  src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart__grocery_store_b_s-256.png"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>
            </Link>

            <Link onClick={handleLogout} to="/home" className="desconectarse">
              Cerrar sesión
            </Link>
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
