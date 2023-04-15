import "./navbar.scss";
import { Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const token = false;

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
        <Link to="/home" onClick={handleProductsClick}>
          Productos
        </Link>
        {token ? (
          <Link to="/login" className="desconectarse">
            Cerrar sesion
          </Link>
        ) : (
          <Link to="/login" className="ingresar">
            Iniciar sesion
          </Link>
        )}
        <DarkMode />
      </div>
    </div>
  );
};

export default Navbar;
